var svg = document.getElementById('house');

class Rectangle {
    constructor(x,y,width,height,color,id,stroke,strColor,trans){
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.color = color;
        this.id = id;
        this.stroke = stroke;
        this.strColor = strColor;
        this.trans = trans;
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
        element.setAttributeNS(null,'transform',this.trans)
    }

}

var t = "translate(200,0)";

function doit(){
    let transformation = document.getElementById('operacao').value;
    t = t.concat(transformation);
    draw();
}

function draw(){

    let element_back = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svg.appendChild(element_back);
    element_back.setAttributeNS(null,'fill','white');
    element_back.setAttributeNS(null,'width',1200);
    element_back.setAttributeNS(null,'height',600);

    let element = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    svg.appendChild(element);
    element.setAttributeNS(null,'points',"200,100 600,100 400,0");
    element.setAttributeNS(null,'fill','purple');
    element.setAttributeNS(null,'stroke','black');
    element.setAttributeNS(null,'stroke-width',2);
    element.setAttributeNS(null,'transform',t)
    
    let floor = new Rectangle(0,350,800,50,'rgb(100,50,10)','floor',0,'black',t);
    let grass = new Rectangle(0,350,800,20,'green','grass',0,'black',t);
    
    let house = new Rectangle(200,100,400,250,'pink','house',0,'black',t);
    for(let i = 0; i < 4; i++){
        let windows1 = new Rectangle(220 + i*102,150,50,50,'blue','window',4,'black',t);
        if(i%2 == 0){
            let windows2 = new Rectangle(240 + i*135,250,50,50,'blue','window',4,'black',t);
            let door = new Rectangle(350 + i*25,250,50,350 - 250,'brown','door',3,'black',t);
            let linesHori = new Rectangle(240+i*135+ 25,250,1,50,'black','line',2,'black',t);
            let linesVert = new Rectangle(240 + i*135,250+25,50,1,'black','line',2,'black',t);
            let macanetas = new Rectangle(380 + i*15,300,10,10,'black','maca',1,'black',t);
        }
        let linesHori = new Rectangle(220 + i*102 + 25,150,1,50,'black','line',2,'black',t);
        let linesVert = new Rectangle(220 + i*102,150+25,50,1,'black','line',2,'black',t);
    }

    t = "translate(200,0)";
}

draw()