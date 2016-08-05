export class AnnotationCoordinate {
  annotationElementId:number;
  timestamp:Date;
  positionX:number;
  positionY:number;

  constructor(obj?:any) {
    this.annotationElementId = obj && obj.annotationElementId || null;
    this.timestamp = obj && obj.timestamp || new Date(); // Init with current timestamp
    this.positionX = obj && obj.positionX || null;
    this.positionY = obj && obj.positionY || null;
  }

  getCoordinates():string {
    return this.positionX + ',' + this.positionY;
  }
}
