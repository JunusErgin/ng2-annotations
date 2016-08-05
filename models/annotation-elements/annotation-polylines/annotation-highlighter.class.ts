import {AnnotationPolyLine} from '../annotation-polyline.class';
export class AnnotationHighlighter extends AnnotationPolyLine {
  name:string;

  constructor(obj?:any) {
    super(obj);
    this.stroke = 'yellow';
    this.strokeWidth = '8';
    this.opacity = '0.5';
  }
}
