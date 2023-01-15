const PADDING_BUFFER = 0.1;

class GraphBounds {
  constructor(coordArray) {
    let x = [];
    let y = [];
    coordArray.forEach((element) => {
      x.push(element.x);
      y.push(element.y);
    });

    this.xMin = Math.min(...x);
    this.xMax = Math.max(...x);
    this.yMin = Math.min(...y);
    this.yMax = Math.max(...y);
  }
}

export class PredictionGraphBounds extends GraphBounds {
  constructor(coordArray) {
    super(coordArray);
    this.xPadding = Math.round(this.xMax - this.xMin);
    this.yPadding = (this.yMax - this.yMin) * PADDING_BUFFER;
  }
}

export class PortfolioGraphBounds extends GraphBounds {
  constructor(graphCoordArray, predictionCoordArray) {
    super([...graphCoordArray, ...predictionCoordArray]);
    this.xPadding = (this.xMax - this.xMin) * PADDING_BUFFER;
    this.yPadding = (this.yMax - this.yMin) * PADDING_BUFFER;
  }
}
