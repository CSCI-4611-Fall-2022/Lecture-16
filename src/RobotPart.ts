import * as gfx from 'gophergfx'

export class RobotPart extends gfx.Transform3
{
    public name: string;
    public boneLength: number;

    constructor(name: string)
    {
        super();

        this.name = name;

        // Recursively create the robot skeleton
        if(this.name == 'root')
        {
            this.boneLength = 0.05;

            const child = new RobotPart('upperArm');
            child.position.set(0, this.boneLength, 0);
            this.add(child);
        }
        else if(this.name == 'upperArm')
        {
            this.boneLength = 0.5;
            this.rotation = gfx.Quaternion.makeRotationY(gfx.MathUtils.degreesToRadians(-45));

            const child = new RobotPart('middleArm');
            child.position.set(0, this.boneLength, 0);
            this.add(child);
        }
        else if(this.name == 'middleArm')
        {
            this.boneLength = 0.4;
            this.rotation = gfx.Quaternion.makeRotationZ(gfx.MathUtils.degreesToRadians(45));

            const child = new RobotPart('lowerArm');
            child.position.set(0, this.boneLength, 0);
            this.add(child);
        }
        else if(this.name == 'lowerArm')
        {
            this.boneLength = 0.4;
            this.rotation = gfx.Quaternion.makeRotationZ(gfx.MathUtils.degreesToRadians(45));
        }
        else
        {
            this.boneLength = 0;
        }
    }

    // Recursively create all the mesh geometry for the robot parts. 
    // Each mesh will be defined in the robot part's local space.
    createMeshes(): void
    {
        if(this.name == 'root')
        {
            const box = new gfx.BoxMesh(0.5, this.boneLength, 0.5);
            box.translateY(this.boneLength/2);
            this.add(box);

            const sphere = new gfx.SphereMesh(0.1, 2);
            sphere.scale.set(1, 0.5, 1);
            sphere.translateY(this.boneLength);
            this.add(sphere);
        }
        else if(this.name == 'upperArm')
        {
            const arm = new gfx.BoxMesh(0.05, this.boneLength, 0.05);
            arm.translateY(this.boneLength/2);
            this.add(arm);
        }
        else if(this.name == 'middleArm')
        {
            const arm = new gfx.BoxMesh(0.05, this.boneLength, 0.05);
            arm.translateY(this.boneLength/2);
            this.add(arm);
        }
        else if(this.name == 'lowerArm')
        {
            const arm = new gfx.BoxMesh(0.05, this.boneLength, 0.05);
            arm.translateY(this.boneLength/2);
            this.add(arm);
        }

        // Recursively call this function for each child robot part
        this.children.forEach((child: gfx.Transform3)=>{
            if(child instanceof RobotPart)
            {
                child.createMeshes();
            }
        });
    }

}