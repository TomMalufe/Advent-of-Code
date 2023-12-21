import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

/**
 * Modules communicate using pulses.
 * Each pulse is either a high pulse or a low pulse.
 * When a module sends a pulse, it sends that type of pulse to each module in its list of destination modules.
 */
class Module {
  static outputQue: Pulse[] = [];
  get name(): string {
    return this._name;
  }
  get state(): string {
    return this._name;
  }
  constructor(protected _name: string) {}
  protected outputs: Module[] = [];
  addOutput(module: Module): void {
    this.outputs.push(module);
    if (module instanceof Conjunction) {
      module.addInput(this);
    }
  }
  receivePulse(pulse: Pulse): void {}
  sendPulse(isHigh: boolean): void {
    this.outputs.forEach((destination) =>
      Module.outputQue.push({
        source: this,
        isHigh,
        destination,
      })
    );
  }
}

interface Pulse {
  source: Module;
  isHigh: boolean;
  destination: Module;
}

/**
 * Flip-flop modules (prefix %) are either on or off; they are initially off.
 * If a flip-flop module receives a high pulse, it is ignored and nothing happens.
 * However, if a flip-flop module receives a low pulse, it flips between on and off.
 * If it was off, it turns on and sends a high pulse.
 * If it was on, it turns off and sends a low pulse.
 */
class FlipFlop extends Module {
  private isOn = false;
  override get state(): string {
    return this._name + (this.isOn ? 'ON' : 'OFF');
  }
  override receivePulse(pulse: Pulse): void {
    if (pulse.isHigh) {
      return;
    }
    this.isOn = !this.isOn;
    this.sendPulse(this.isOn);
  }
}

/**
 * Conjunction modules (prefix &) remember the type of the most recent pulse received from each of their
 * connected input modules; they initially default to remembering a low pulse for each input.
 * When a pulse is received, the conjunction module first updates its memory for that input.
 * Then, if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
 */
class Conjunction extends Module {
  private inputs: Map<string, boolean> = new Map();
  addInput(module: Module): void {
    this.inputs.set(module.name, false);
  }
  override get state(): string {
    return (
      this._name +
      Array.from(this.inputs.keys()).map(
        (key) => key + (this.inputs.get(key) ? 'HIGH' : 'LOW')
      )
    );
  }
  override receivePulse(pulse: Pulse): void {
    this.inputs.set(pulse.source.name, pulse.isHigh);
    const inputValues = this.inputs.values();
    for (const isHigh of inputValues) {
      if (!isHigh) {
        this.sendPulse(true);
        return;
      }
    }
    this.sendPulse(false);
  }
}

/**
 * There is a single broadcast module (named broadcaster).
 * When it receives a pulse, it sends the same pulse to all of its destination modules.
 */
class Broadcast extends Module {
  static _name = 'broadcaster';
  override receivePulse(pulse: Pulse) {
    this.sendPulse(pulse.isHigh);
  }
}

@Component({
  selector: 'advent-year2023-day20',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day20Component extends DayTemplateComponent {
  override defaultInput = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

  processInput(value: string): void {
    Module.outputQue = [];
    const lines = value
      .split('\n')
      .map(
        (line) =>
          line.matchAll(/([%&]?)([a-z]+) -> ((?:(?:[a-z]+)(?:, )?)+)/g).next()
            .value
      );

    // Create modules
    const modules: Map<string, Module> = new Map();
    lines.forEach((match) => {
      if (match[1] === '%') {
        modules.set(match[2], new FlipFlop(match[2]));
        return;
      }
      if (match[1] === '&') {
        modules.set(match[2], new Conjunction(match[2]));
        return;
      }
      if (match[2] === 'broadcaster') {
        modules.set(match[2], new Broadcast(match[2]));
        return;
      }
      throw new Error('LINE NOT HANDLED! ' + match[0]);
    });
    // Connect Modules
    lines.forEach((match) => {
      const links = match[3].split(', ');
      for (const link of links) {
        if (!modules.has(link)) {
          // If we have no module with this name, create a dead end to receive pulses
          modules.set(link, new Module(link));
        }
        modules.get(match[2])?.addOutput(modules.get(link)!);
      }
    });

    this.result1 = '';
  }
}
