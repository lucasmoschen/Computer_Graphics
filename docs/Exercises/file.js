var svg = document.getElementById('house');

class Rectangle {
    constructor(x,y,width,height,color,id,stroke,strColor){
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.color = color;
        this.id = id;
        this.stroke = stroke;
        this.strColor = strColor;
        this.setAttributes();
    }

    setAttributes(){
        let element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        svg.appendChild(element);
        element.setAttributeNS(null,'x',this.x);
        element.setAttributeNS(null,'y',this.y);
        element.setAttributeNS(null, 'width', this.width);
        element.setAttributeNS(null,'height',this.height);
        element.setAttributeNS(null,'fill', this.color);
        element.setAttributeNS(null, 'id', this.id);
        element.setAttributeNS(null,'stroke-width',this.stroke);
        element.setAttributeNS(null,'stroke',this.strColor);
    }

}

let floor = new Rectangle(0,350,800,50,'rgb(100,50,10)','floor',0,'black');
let grass = new Rectangle(0,350,800,20,'green','grass',0,'black');

let house = new Rectangle(200,100,400,250,'pink','house',0,'black');
for(let i = 0; i < 4; i++){
    let windows1 = new Rectangle(220*(7/15*i+1),150,50,50,'blue','window',4,'black');
    if(i%2 == 0){
        let windows2 = new Rectangle(240 + i*135,250,50,50,'blue','window',4,'black');
        let door = new Rectangle(350 + i*25,250,50,350 - 250,'brown','door',3,'black');
        let linesHori = new Rectangle(240+i*135+ 25,250,1,50,'black','line',2,'black');
        let linesVert = new Rectangle(240 + i*135,250+25,50,1,'black','line',2,'black');
        let macanetas = new Rectangle(380 + i*15,300,10,10,'black','maca',1,'black');
    }
    let linesHori = new Rectangle(220*(7/15*i+1) + 25,150,1,50,'black','line',2,'black');
    let linesVert = new Rectangle(220*(7/15*i+1),150+25,50,1,'black','line',2,'black');
}






