import { regExToArray } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { reduce } from "rxjs";
import { DayTemplateComponent } from '../day-template.component';

class Point3D {
  constructor(public x: number, public y: number, public z: number) {}
  add(point: Point3D): void {
    this.x += point.x;
    this.y += point.y;
    this.z += point.z;
  }
}

class SandBlock {
  static compareMaxZ(b1: SandBlock, b2: SandBlock): number {
    return b1.maxZ - b2.maxZ;
  }
  static compareMinZ(b1: SandBlock, b2: SandBlock): number {
    return b1.minZ - b2.minZ;
  }

  public supports: SandBlock[] = [];
  public supportedBy: SandBlock[] = [];

  get maxX(): number {
    return this.position[0].x > this.position[1].x
      ? this.position[0].x
      : this.position[1].x;
  }
  get minX(): number {
    return this.position[0].x < this.position[1].x
      ? this.position[0].x
      : this.position[1].x;
  }
  get maxY(): number {
    return this.position[0].y > this.position[1].y
      ? this.position[0].y
      : this.position[1].y;
  }
  get minY(): number {
    return this.position[0].y < this.position[1].y
      ? this.position[0].y
      : this.position[1].y;
  }
  get maxZ(): number {
    return this.position[0].z > this.position[1].z
      ? this.position[0].z
      : this.position[1].z;
  }
  get minZ(): number {
    return this.position[0].z < this.position[1].z
      ? this.position[0].z
      : this.position[1].z;
  }

  constructor(public position: [Point3D, Point3D], public id: number) {}
  move(distance: Point3D): void {
    this.position[0].add(distance);
    this.position[1].add(distance);
  }
  doesIntersect(block: SandBlock) {
    return (
      this.minX <= block.maxX &&
      this.maxX >= block.minX &&
      this.minY <= block.maxY &&
      this.maxY >= block.minY &&
      this.minZ <= block.maxZ &&
      this.maxZ >= block.minZ
    );
  }
  isPointInside(point: Point3D) {
    return (
      point.x >= this.minX &&
      point.x <= this.maxX &&
      point.y >= this.minY &&
      point.y <= this.maxY &&
      point.z >= this.minZ &&
      point.z <= this.maxZ
    );
  }
}

@Component({
  selector: 'advent-year2023-day22',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day22Component extends DayTemplateComponent {
  override defaultInput = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

  processInput(value: string): void {
    let id=1;
    const blocks: SandBlock[] = value.split('\n').map((line) => {
      const match = regExToArray(line.matchAll(/\d+/g)).map((it) =>
        Number.parseInt(it)
      );
      return new SandBlock([
        new Point3D(match[0], match[1], match[2]),
        new Point3D(match[3], match[4], match[5]),
      ], id++);
    });

    blocks.sort(SandBlock.compareMinZ);
    const moveStep = new Point3D(0, 0, -1);
    const stepBack = new Point3D(0, 0, 1);

    blocks.forEach((block) => {
      do {
        block.move(moveStep);
      } while (
        block.minZ > 0 &&
        !blocks.some((it) => it !== block && it.doesIntersect(block))
      );
      block.move(stepBack);
    });

    blocks.sort(SandBlock.compareMinZ);
    blocks.forEach((block) => {
      block.move(moveStep);
      blocks
        .filter(
          (it) =>
            it !== block && it.maxZ === block.minZ && it.doesIntersect(block)
        )
        .forEach((it) => {
          it.supports.push(block);
          block.supportedBy.push(it);
        });
      block.move(stepBack);
    });
    const canBeDestroyed = blocks.filter(
      (it) =>
        it.supports.length === 0 ||
        it.supports.every((by) => by.supportedBy.length > 1)
    ).map(it => it.id);

    // const memory: number[] = Array.from({length: blocks.length}, (_,index) => canBeDestroyed.includes(index)? 0 : -1);
    // blocks.forEach(block => {
    //   if (memory[block.id] >= 0) {
    //     return;
    //   }
    //   let count = block.supports.length;
    // });

    this.result1 = '';
    this.result2 = '';
  }
}
