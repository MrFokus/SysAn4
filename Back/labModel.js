module.exports = {
    Result: function searchMinWay(inputMatrix) {
        const matrixShortestPaths = Array(inputMatrix.length).fill(undefined).map(() =>{
            return Array(inputMatrix.length).fill(0)
        });
        console.table(matrixShortestPaths);
        function searchIncludeThisVertices(vertices){
            let includeEdges=[]
            inputMatrix[vertices].forEach((value, index) => {
                if(value===-1){
                    includeEdges.push(index)
                }
            });
            let includeVertices=[]
            for (let i = 0; i < inputMatrix.length; i++) {
                includeEdges.forEach(j => {
                    if (inputMatrix[i][j]===1){
                        includeVertices.push(i)
                    }
                })
            }
            return includeVertices
        }

        function searchMinWayForTwoVertices(withVertices,inVertices){
            let includeVer = Array(inputMatrix.length).fill(NaN)
            includeVer[inVertices]=0
            let stop= false;
            let resultSearch
            if(withVertices === inVertices){
                return 0;
            }
            for (let i = 0; i < inputMatrix.length; i++) {
                if(!(inputMatrix[withVertices].includes(-1))){
                    return -1
                }
            }
            resultSearch=[inVertices]
            while(stop===false) {
                let nextIterationV=[]
                for (let i = 0; i < resultSearch.length; i++) {
                    let newResultSearch = searchIncludeThisVertices(resultSearch[i])
                    nextIterationV = nextIterationV.concat(newResultSearch);
                    for (let j = 0; j < newResultSearch.length; j++) {
                        if(isNaN(includeVer[newResultSearch[j]])){
                            includeVer[newResultSearch[j]]=includeVer[resultSearch[i]]+1;
                        }
                        if(newResultSearch.includes(withVertices)){
                            stop=true
                        }
                    }
                }
                resultSearch=nextIterationV
            }
            return includeVer[withVertices]

        }
        // let result=searchMinWayForTwoVertices(3,1);
        for (let i = 0; i < inputMatrix.length; i++) {
            for (let j = 0; j < inputMatrix.length; j++) {
                let result=searchMinWayForTwoVertices(i,j);
                console.log( i+1, j+1,result)
                matrixShortestPaths[i][j]=result
            }

        }
        console.table(matrixShortestPaths)
        return{
            matrixShortestPaths:matrixShortestPaths
        }
    }
}
