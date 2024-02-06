function initBuffers(gl) {

    const positionBuffer = initPositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);
    const indexBuffer = initIndexBuffer(gl);

    
    return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
}

function initPositionBuffer(gl) {

    const positionBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    //cube vertices. 4 per face, 6 faces
    const positions = [
        //front x, y, z
        -1.0, -1.0, 1.0,    1.0, -1.0, 1.0,     1.0, 1.0, 1.0,      -1.0, 1.0, 1.0,

        //back
        -1.0, -1.0, -1.0,   1.0, -1.0, -1.0,    1.0, 1.0, -1.0,     -1.0, 1.0, -1.0,

        //top
        -1.0, 1.0, -1.0,     -1.0, 1.0, 1.0,    1.0, 1.0, 1.0,      1.0, 1.0, -1.0,

        //bottom
        -1.0, -1.0, -1.0,   -1.0, -1.0, 1.0,    1.0, -1.0, 1.0,     1.0, -1.0, -1.0,

        //right
        1.0, -1.0, -1.0,    1.0, -1.0, 1.0,     1.0, 1.0, 1.0,      1.0, 1.0, -1.0,

        //left
        -1.0, -1.0, -1.0,   -1.0, -1.0, 1.0,    -1.0, 1.0, 1.0,     -1.0, 1.0, -1.0,
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}

function initColorBuffer(gl) {
    
    const faceColors = [
        [1.0, 1.0, 1.0, 1.0],  //white
        [1.0, 0.0, 0.0, 1.0],   //red
        [0.0, 1.0, 0.0, 1.0],   //green
        [0.0, 0.0, 1.0, 1.0],  //blue
        [1.0, 1.0, 0.0, 1.0],   //yellow
        [1.0, 0.0, 1.0, 1.0], //purple
    ];
    
    var colors = [];
    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];
        colors = colors.concat(c, c, c, c);
    }
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
    
};

function initIndexBuffer(gl) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    //each face has two triangles
    const indices = [
    0,1,2,      0,2,3,//front
    4,5,6,      4,6,7, //back
    8,9,10,     8,10,11, //top
    12,13,14,   12,14,15, //bottom
    16,17,18,   16,18,19, //right
    20,21,22,   20,22,23, //left
    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW,);

    return indexBuffer;
};

export { initBuffers };
