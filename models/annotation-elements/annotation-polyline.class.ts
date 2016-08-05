import {AnnotationElement} from '../annotation-element.class';
import {AnnotationCoordinate} from '../annotation-coordinate.class';
export class AnnotationPolyLine extends AnnotationElement {
  annotationCoordinates:AnnotationCoordinate[];

  constructor(obj?:any) {
    super(obj);
    this.annotationCoordinates = obj && obj.annotationCoordinates || [];
  }

  /**
   * Returns a list of all coordinates of the line.
   * The format fits for the 'points' attribute of the svg elemet <polyfill>.
   * @returns {string} - String of coordinates, seperated by ', '.
   */
  getPolylinePoints():string {
    let polylinePoints:string[] = [];
    this.annotationCoordinates.forEach(
      (annotationCoordinate:AnnotationCoordinate) => {
        polylinePoints.push(annotationCoordinate.getCoordinates());
      }
    );
    return polylinePoints.join(', ');
  }


  /**
   * Adding a coordinate to the line
   * @param x
   * @param y
   */
  addCoordinate(x:number, y:number):void {
    // Only go on if all coordinates are valid
    if (!!x && x >= 0 && !!y && y >= 0) {
      let coordinate:AnnotationCoordinate = new AnnotationCoordinate({
        annotationElementId: this.id,
        positionX: x,
        positionY: y
      });
      this.annotationCoordinates.push(coordinate);
    }
  }

}
