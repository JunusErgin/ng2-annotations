import {AnnotationPolyLine} from '../annotation-polyline.class';
export class AnnotationLine extends AnnotationPolyLine {
  name:string;

  constructor(obj?:any) {
    super(obj);
    this.stroke = 'black';
    this.strokeWidth = '3';
  }
}
