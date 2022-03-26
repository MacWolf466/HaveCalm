var Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite;




class Blob{

    constructor(pos, skeletonOffsets, skeletonConstraints, structureConstraints){
        this.pos = pos;
        this.initShape = "M 0 0 C 0 0 0 -45.5625 91.125 -91.125 C 268.8188 -113.9063 262.7438 -78.975 273.375 -45.5625 C 273.375 0 273.375 91.125 182.25 91.125 C 136.6875 91.125 91.125 91.125 45.5625 91.125 C 45.5625 91.125 0 45.5625 0 0 M 0 0";
        this.nodePos = calculateNodePos(initShape, 30);
        
        this.nodes = createNodeBodies();
        this.nodeLinks = createNodeLinks();
        this.skin = Composite.create({
            bodies: [this.nodes],
            constraints: [this.nodeLinks]
        });

        this.skeletonNodes = createSkeletonNodes(skeletonOffsets);
        this.skeletonLinks = createSkeletonContstraints(skeletonConstraints);
        this.skeleton = Composite.create({
            bodies: [this.skeletonNodes],
            constraints: [this.skeletonLinks]
        });      

        this.structureLinks = createStructureConstraints(structureConstraints);

        this.body = Composite.create({
            composites: [this.skin, this.skeleton],
            constraints: [this.structureLinks]
        })
    
    
    }
    //calculates the positions of several nodes along an svg path
    calculateNodePos(initShape, numNodes){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", initShape);
        svg.appendChild(path);
        var pathLen = path.getTotalLength();
        var nodePos = [];
        for (var i = 0; i < pathLen; i+= (pathLen)/numNodes){
            nodePos.push(path.getPointAtLength(i));
        }
        return nodePos;
    }

    createNodeBodies(){
        var nodes = [];
        this.nodePos.forEach(position => {
            nodes.push(
                Bodies.circle(
                    position.x + this.pos.x,
                    position.y + this.pos.y,
                    10,{
                        density: 0.005,
                        restitution: 0,
                        isStatic: false
                    }
                )
            )
        });
        return nodes;
    }
    createNodeLinks(){
        var links = [];
        for(var i = 0; i < this.nodes.length; i++){
            var current = this.nodes[i];
            var next = this.nodes[i+1 % this.nodes.length];
            var nextnext = this.nodes[i+2 % this.nodes.length];
            links.push(
                Constraint.create({
                    bodyA:current,
                    bodyB:next,
                    stiffness: 0.4
                }), 
                Constraint.create({
                    bodyA: current, 
                    bodyB: nextnext,
                    stiffness: 0.4
                })
            );
        }
        return links;
    }

    createSkeletonNodes(skeletonOffsets){
        var skeletonNodes = [];
        skeletonOffsets.forEach((offset) => {
            skeletonNodes.push(
                Bodies.circle(
                    offset.x + this.pos.x, 
                    offset.y + this.pos.y, 
                    10, {
                            isStatic: false
                    }
                )
            );
        });
        return skeletonNodes;
    }

    createSkeletonContstraints(skeletonConstraints){
        var skeletonLinks = [];
        skeletonConstraints.forEach(info => {
            skeletonLinks.push(
                Constraint.create({
                    bodyA:this.skeletonNodes[info.bodyAIndex],
                    bodyB:this.skeletonNodes[info.bodyBIndex],
                    stiffNess: 0.8
                })
            );
        });
        return skeletonLinks;
    }

    createStructureConstraints(structureConstraints){
        var structureLinks = []
        structureConstraints.forEach(info => {
            structureLinks.push(
                Constraint.create({
                    bodyA:this.skeletonNodes[info.bodyAIndex],
                    bodyB:this.nodes[info.bodyBIndex],
                    stiffNess: 1
                })
            );
        });
        return structureLinks;
    }
}