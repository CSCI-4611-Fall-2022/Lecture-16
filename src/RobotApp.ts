/* Lecture 16
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { GUI } from 'dat.gui'
import { Robot } from './Robot';

export class RobotApp extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;
    private robot: Robot;

    // GUI variables
    private upperArmRotate: number;
    private upperArmBend: number;
    private middleArmBend: number;
    private lowerArmBend: number;
    private endEffectorBend: number;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.robot = new Robot();

        this.upperArmRotate = -45;
        this.upperArmBend = 0;
        this.middleArmBend = 45;
        this.lowerArmBend = 60;
        this.endEffectorBend = 45;
    }

    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, .1, 20)
        this.cameraControls.setTargetPoint(new gfx.Vector3(0, 0.6, 0));
        this.cameraControls.setDistance(1.5);

        // Set a black background
        this.renderer.background.set(0, 0, 0);
        
        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Vector3(0.3, 0.3, 0.3));
        this.scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new gfx.DirectionalLight(new gfx.Vector3(0.6, 0.6, 0.6));
        directionalLight.position.set(2, 1, 3)
        this.scene.add(directionalLight);

        // Create a grid for the ground plane
        const gridSize = 10;
        const gridVertices: number[] = [];
        for(let i=-gridSize/2; i <= gridSize/2; i++)
        {
            gridVertices.push(-gridSize/2, 0, i);
            gridVertices.push(gridSize/2, 0, i);
            gridVertices.push(i, 0, -gridSize/2);
            gridVertices.push(i, 0, gridSize/2);
        }

        const gridLines = new gfx.Line3(gfx.LineMode3.LINES);
        gridLines.setVertices(gridVertices);
        gridLines.createDefaultVertexColors();
        gridLines.material.color.set(0.5, 0.5, 0.5);
        this.scene.add(gridLines);

        // Add the robot to the scene
        this.robot.createMeshes();
        this.scene.add(this.robot);

        // Create the GUI
        const gui = new GUI();

        const upperArmControls = gui.addFolder('Upper Arm Controls');
        upperArmControls.open();

        const upperYController = upperArmControls.add(this, 'upperArmRotate', -180, 180);
        upperYController.name('rotate');
        upperYController.onChange((value: number) => { 
            const bendRotation = gfx.Quaternion.makeRotationZ(gfx.MathUtils.degreesToRadians(this.upperArmBend));
            const rotation = gfx.Quaternion.makeRotationY(gfx.MathUtils.degreesToRadians(this.upperArmRotate));
            this.robot.setPose('upperArm', gfx.Quaternion.multiply(rotation, bendRotation));
        });

        const upperZController = upperArmControls.add(this, 'upperArmBend', -45, 45);
        upperZController.name('bend');
        upperZController.onChange((value: number) => { 
            const bendRotation = gfx.Quaternion.makeRotationZ(gfx.MathUtils.degreesToRadians(this.upperArmBend));
            const rotation = gfx.Quaternion.makeRotationY(gfx.MathUtils.degreesToRadians(this.upperArmRotate));
            this.robot.setPose('upperArm', gfx.Quaternion.multiply(rotation, bendRotation));
         });

        const middleArmControls = gui.addFolder('Middle Arm Controls');
        middleArmControls.open();

        const middleZController = middleArmControls.add(this, 'middleArmBend', -135, 135);
        middleZController.name('bend');
        middleZController.onChange((value: number) => { 
            const rotation = gfx.Quaternion.makeRotationZ(gfx.MathUtils.degreesToRadians(this.middleArmBend));
            this.robot.setPose('middleArm', rotation);
        });

        const lowerArmControls = gui.addFolder('Lower Arm Controls');
        lowerArmControls.open();

        const lowerZController = lowerArmControls.add(this, 'lowerArmBend', -135, 135);
        lowerZController.name('bend');
        lowerZController.onChange((value: number) => { 
            const rotation = gfx.Quaternion.makeRotationZ(gfx.MathUtils.degreesToRadians(this.lowerArmBend));
            this.robot.setPose('lowerArm', rotation);
         });

        const endEffectorControls = gui.addFolder('End Effector Controls');
        endEffectorControls.open();

        const endEffectorXController = endEffectorControls.add(this, 'endEffectorBend', -90, 90);
        endEffectorXController.name('bend');
        endEffectorXController.onChange((value: number) => { 
            const rotation = gfx.Quaternion.makeRotationX(gfx.MathUtils.degreesToRadians(this.endEffectorBend));
            this.robot.setPose('endEffector', rotation);
         });

         const robotControls = gui.addFolder('Robot Controls');
         robotControls.open();

         const resetButton = robotControls.add(this.robot, 'reset');
    }

    update(deltaTime: number): void 
    {
        // Update the camera orbit controls
        this.cameraControls.update(deltaTime);

        // Update the robot animation
        this.robot.update(deltaTime);
    }
}