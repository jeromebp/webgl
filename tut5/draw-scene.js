function drawScene(gl, programInfo, buffers, cubeRotation) {

    //basic colour and clear
    gl.clearColor(0.2, 0.7, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    //clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //perspective matrix
    const fov = (45 * Math.PI) / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);

    //set identity point
    const modelViewMatrix = mat4.create();

    mat4.translate(
        modelViewMatrix,    //destination
        modelViewMatrix,    //original
        [-0.0, 0.0, -6.0]
    );

    //for rotate
    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        cubeRotation * 0.6,
        [0, 0, 1]
    );
    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        cubeRotation * 0.5,
        [0, 1, 0]
    );
    mat4.rotate(
        modelViewMatrix,
        modelViewMatrix,
        cubeRotation * 0.8,
        [1, 0, 0]
    );
    
    
    //position from buffer to vertexPosition attribute
    setPositionAttribute(gl, buffers, programInfo);
    //color
    setColorAttribute(gl, buffers, programInfo);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );

    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        //gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

}


function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3;    //3 vertices
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0; //stride?
    const offset = 0; // ?

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    
}

function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}
export { drawScene };
