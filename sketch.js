// const path = "M158.670013,390.160097 C166.295912,389.535757 173.412307,388.380467 180.021905,386.734081 C187.668711,384.829337 194.637182,382.267271 200.931508,379.109596 C208.422778,375.35145 214.95913,370.749632 220.547631,365.408176 C227.275782,358.977448 232.630076,351.47466 236.622841,343.081356 C241.072257,333.728113 243.830899,323.26901 244.915829,311.955278 C245.933016,301.347985 245.47898,289.989459 243.567783,278.086746 C241.935732,267.922526 239.241097,257.361476 235.492631,246.532526 C232.281117,237.254777 228.296062,227.780382 223.542973,218.190422 C219.059649,209.144748 216.017103,200.076627 214.075041,191.048426 C211.856702,180.735879 211.074227,170.475417 211.22045,160.359989 C211.371529,149.908615 212.514018,139.612069 214.088525,129.572869 C215.698799,119.305619 217.760941,109.30754 219.676565,99.6882989 C221.777322,89.1394212 223.701873,79.046144 224.661036,69.5531013 C225.780567,58.4728619 225.584904,48.2103495 222.819151,38.9955498 C220.422957,31.0120317 216.097616,23.8149417 209.027046,17.5538435 C204.276777,13.3474078 198.287409,9.56344557 190.81147,6.24731112 C180.813278,1.81237024 170.338418,-0.154435044 159.661629,0.00943311039 C149.36629,0.167446726 138.883194,2.30660774 128.458669,6.1243468 C118.360878,9.82242763 108.318045,15.0955132 98.5540586,21.6686017 C88.8967563,28.1698706 79.5122399,35.9428893 70.6171382,44.7215721 C61.5760702,53.6443109 53.0406109,63.60599 45.2382295,74.3272085 C37.0473397,85.5822747 29.6643504,97.674404 23.3524304,110.280345 C16.4828915,123.999943 10.8820257,138.328148 6.88909278,152.848245 C2.45158589,168.985013 0,185.358784 0,201.397579 C0,216.285934 1.35183378,230.800201 3.91353308,244.740675 C6.48274838,258.72205 10.2689391,272.12626 15.1288837,284.751836 C19.8497025,297.015981 25.5836785,308.545433 32.1995413,319.155538 C38.5371077,329.319329 45.6839283,338.63949 53.5246114,346.9537 C61.0067112,354.887671 69.120659,361.9056 77.7661819,367.866433 C86.019758,373.55703 94.7578036,378.284207 103.893075,381.925237 C112.620216,385.4036 121.709882,387.890699 131.086008,389.279534 C140.041439,390.606053 149.258201,390.930652 158.670013,390.160097 Z";

const path = "M 0 0 C 0 0 0 -45.5625 91.125 -91.125 C 268.8188 -113.9063 262.7438 -78.975 273.375 -45.5625 C 273.375 0 273.375 91.125 182.25 91.125 C 136.6875 91.125 91.125 91.125 45.5625 91.125 C 45.5625 91.125 0 45.5625 0 0 M 0 0"
let Engine = Matter.Engine,
        Render = Matter.Render,
        Body = Matter.Body,
        World = Matter.World,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies;




class Sketch {
	constructor(){

		this.time = 0;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.mouse = {
			x:300,y:300
		}
		// this.initPaper();
		//matter.js boilerplate code for physics
        this.physics();
		//create all the objects on the page
		this.addObjects();
		this.mouseEvents()
		this.renderLoop();

		// setTimeout(()=>{
		// 	document.getElementById('container').style.opacity = 1;
		// 	document.getElementById('paper').style.opacity = 0;
		// },3000)

		// setTimeout(()=>{
		// 	document.getElementById('container').style.opacity = 0;
		// 	document.getElementById('paper').style.opacity = 1;
		// },6000)
	}

	mouseEvents(){
		this.render.canvas.addEventListener('mousemove',(e)=>{
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
			// this.mouse.x = e.clientX - this.cursor.positionPrev.x;
			// this.mouse.y = e.clientY - this.cursor.positionPrev.y;
		})
	}

	physics(){
		this.engine = Engine.create(),
  		this.world = this.engine.world;

  		// this.engine.world.gravity.x = 0;
  		// this.engine.world.gravity.y = 0;
  		// create renderer
  		this.render = Render.create({
  		  element: document.querySelector('#container'),
  		  engine: this.engine,
  		  options: {
  		      width: this.width,
  		      height: this.height,
  		      showVelocity: true
  		  }
  		});


  		Render.run(this.render);

  		// create runner
  		this.runner = Runner.create();
  		Runner.run(this.runner, this.engine);
	}

	addObjects(){
		// this.shadow = new Paper.Path(path);
		// this.pp = new Paper.Path(path);
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.blobPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.blobPath.setAttribute("d", path);
        this.svg.appendChild(this.blobPath);
        this.blobPathLen = this.blobPath.getTotalLength();
        this.numNodes = 30;
        this.blobSegments = [];
        for (let i = 0; i < this.blobPathLen; i+= (this.blobPathLen)/this.numNodes){
            this.blobSegments.push(this.blobPath.getPointAtLength(i));
        }
		// this.pp.fillColor = '#ff0000'
		// this.number = this.pp.segments.length;

		// this.shadow.fillColor = '#00ff00'
		// this.shadow.shadowBlur = 30;
		// this.shadow.shadowColor = '#555555';


		// this.group = new Paper.Group([this.pp]);
		// this.group.clipped = true;

		// let img = new Image();
		// img.onload = ()=>{
		// 	let rasterImg = new Paper.Raster(img);
		// 	rasterImg.fitBounds(Paper.view.bounds, true)
		// 	this.group.addChild(rasterImg)
		// }
		// img.src = bg;



        //arrays of the different types of objects
		this.circles = []
		this.anchors = []
		this.links = []

		this.cursor = Bodies.circle(300,300,50,{
			isStatic: false
		})

		this.center = Bodies.circle(300,300,50,{
			isStatic: false
		})
        this.ground = Bodies.rectangle(0, 550, this.width, 50,{
            isStatic: true
        });
        this.wall = Bodies.rectangle(0,0, 30, 3000,{
            isStatic: true
        })
        this.stuffingPoints = [[255,263],[323,247],[291, 287], [422,230], [366,306], [240,359], [310, 340], [416, 344], [342,371]]
        this.stuffing = []
        this.stuffingPoints.forEach((point) => {
            this.stuffing.push(Bodies.circle(point[0], point[1], 10, {
                isStatic: false
            }))
        })
        //fill beanbag
        
        //creating all the circles
		for (let i = 0; i < this.blobSegments.length; i++) {
			this.circles.push(
				Bodies.circle(
					this.blobSegments[i].x + 185,
					this.blobSegments[i].y + 310,
					10,{
						density: 0.005,
						restitution: 0,
                        isStatic: false
					}
				)
			)	
		}
        var sConstraintPairs = [[0,1],[0,2],[0,5],[1,3], [1,2], [1,4], [1,3], [2,6], [3,4], [3,7], [4,7], [4,8], [5,6], [5,8], [6,8], [7,8]]
        sConstraintPairs.forEach((pair) => {
            this.links.push(
                
                Constraint.create({
                    bodyA:this.stuffing[pair[0]], 
                    bodyB:this.stuffing[pair[1]],
                    stiffness: 0.8
                })
            )
        });


        var l = 1;

        console.log(this.blobSegments[4])
        this.links.push(
            Constraint.create({
                bodyA:this.stuffing[0],
                bodyB:this.circles[4],
                stiffness: l
            }), 
            Constraint.create({
                bodyA:this.stuffing[0],
                bodyB:this.circles[3],
                stiffness: l
            }),
            Constraint.create({
                bodyA:this.stuffing[1],
                bodyB:this.circles[6],
                stiffness: l
            }), 
            Constraint.create({
                bodyA:this.stuffing[1],
                bodyB:this.circles[8],
                stiffness: l
            }),
            Constraint.create({
                bodyA:this.stuffing[3],
                bodyB:this.circles[11],
                stiffness: l
            }), 
            Constraint.create({
                bodyA:this.stuffing[3],
                bodyB:this.circles[14],
                stiffness: l
            }),
            Constraint.create({
                bodyA:this.stuffing[7],
                bodyB:this.circles[14],
                stiffness: 1
            }),
            Constraint.create({
                bodyA:this.stuffing[7],
                bodyB:this.circles[17],
                stiffness: l
            }), 
            Constraint.create({
                bodyA:this.stuffing[7],
                bodyB:this.circles[19],
                stiffness: l
            }),
            Constraint.create({
                bodyA:this.stuffing[8],
                bodyB:this.circles[20],
                stiffness: l
            }), 
            Constraint.create({
                bodyA:this.stuffing[8],
                bodyB:this.circles[22],
                stiffness: l
            }),
            Constraint.create({
                bodyA:this.stuffing[5],
                bodyB:this.circles[27],
                stiffness: l
            }), 
            Constraint.create({
                bodyA:this.stuffing[5],
                bodyB:this.circles[24],
                stiffness: l
            }),
            Constraint.create({
                bodyA:this.stuffing[5],
                bodyB:this.circles[0],
                stiffness: l
            }),
        )

		for (let i = 0; i < this.blobSegments.length; i++) {
			let next = this.circles[i+1]?this.circles[i+1]:this.circles[0]
			// this.links.push(
			// 	Constraint.create({
			// 		bodyA:this.circles[i],
			// 		bodyB:this.anchors[i],
			// 		stiffness: 0.01
			// 	})
			// )
			this.links.push(
				Constraint.create({
					bodyA:this.circles[i],
					bodyB:next,
					stiffness: 0.5
				})
			)


			// this.links.push(
			// 	Constraint.create({
			// 		bodyA:this.circles[i],
			// 		bodyB:this.center,
			// 		stiffness: 0.01
			// 	})
			// )
			let nextnext = this.circles[(i+2)%this.blobSegments.length];
			this.links.push(
				Constraint.create({
					bodyA:this.circles[i],
					bodyB:nextnext,
					stiffness: 0.4
				})
			)
		}


		// this.mouse = Mouse.create(this.render.canvas);
	 //    this.mouseConstraint = MouseConstraint.create(this.engine, {
	 //        mouse: this.mouse,
	 //        constraint: {
	 //            stiffness: 0.2
	 //        }
	 //    });
	 //    this.render.mouse = this.mouse;

	    // Composite.add(this.world, this.mouseConstraint);
	    
	    World.add(this.engine.world, this.circles);
	    // World.add(this.engine.world, this.cursor);
	    World.add(this.engine.world, this.links);
	    // World.add(this.engine.world, this.center);
        World.add(this.engine.world, this.ground);
        World.add(this.engine.world, this.wall);
        World.add(this.engine.world, this.stuffing);

	    // Render.lookAt(this.render, {
	    //     min: { x: 0, y: 0 },
	    //     max: { x: 800, y: 600 }
	    // });
	}

	initPaper(){
		this.paperCanvas = document.getElementById('paper')
		this.project = new Paper.Project(this.paperCanvas)
	}


	renderLoop(){
		this.time += 0.05;

		for (let i = 0; i < this.blobSegments.length; i++) {
			this.blobSegments[i].x = this.circles[i].position.x;
			this.blobSegments[i].y = this.circles[i].position.y;
            var xxx = this.mouse.x - this.circles[i].position.x;
            var yyy = this.mouse.y - this.circles[i].position.y;
            if(Math.sqrt(xxx*xxx - yyy*yyy) <= 10){
                console.log(i)
            }


		}

        
		window.requestAnimationFrame(this.renderLoop.bind(this));
	}
}
var t = new Sketch();
