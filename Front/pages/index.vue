<template>
  <main class="adjacency-incident-L_incident">
    <div class="content">
      <h2 style="color: white">Лабораторная работа №4</h2>
      <h3>Введите размер матрицы инциденций</h3> <br>
      <div class="sizeMatrix">
        <div class="vertexes">
          <p>Вершины</p>
          <select v-model="vertexes">
            <option v-for="val in 10">{{ val }}</option>
          </select>
        </div>
        <div class="edges">
          <p>Дуги</p>
          <select v-model="edges">
            <option v-for="val in 20">{{ val }}</option>
          </select>
        </div>
        <button class="result" @click="Result">Расчитать</button>
      </div>

      <div class="matrixs">
        <div v-if="vertexes>0&&edges>0" class="input">
          <table>
            <tr>
              <th></th>
              <th v-for="i in +edges">e{{ i }}</th>
            </tr>
            <tr v-for="j in +vertexes">
              <td style="font-weight: bold; color: white">{{ j }}</td>
              <td v-for="i in +edges">
                <input class="cell" type="text" v-model="matrix[+j-1][+i-1]">
              </td>
            </tr>
          </table>
          <br>
          <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div v-if="isMatrix" class="matrix">
          <h3>Матрица расстояний U </h3>
          <div class="table">
            <table>
              <tr>
                <th></th>
                <th v-for="i in  result.matrixShortestPaths[0].length">{{ i }}</th>
              </tr>
              <tr v-for="j in result.matrixShortestPaths.length">
                <td style="font-weight: bold; color: white">{{ j }}</td>
                <td style="background-color: white" v-for="i in  result.matrixShortestPaths[0].length">
                  {{ result.matrixShortestPaths[j - 1][i - 1] }}
                </td>
              </tr>
            </table>
          </div>

        </div>
      </div>

    </div>

  </main>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      isMatrix: false,
      edges: null,
      vertexes: null,
      matrix: [],
      error: null,
    }
  },

  watch: {
    vertexes() {
      if (this.vertexes > 0 && this.edges > 0) {
        this.isMatrix = false
        this.matrix.splice(0, this.matrix.length)
        this.matrix = [];
        for (let i = 0; i < this.vertexes; i++) {
          this.matrix.push([])
          for (let j = 0; j < this.edges; j++) {
            this.matrix[i].push(0)
          }

        }
      }

    },
    edges() {
      if (this.vertexes > 0 && this.edges > 0) {
        this.isMatrix = false
        this.matrix.splice(0, this.matrix.length)
        this.matrix = [];
        for (let i = 0; i < this.vertexes; i++) {
          this.matrix.push([])
          for (let j = 0; j < this.edges; j++) {
            this.matrix[i].push(0)
          }

        }
      }

    }
  },
  methods: {
    async Result() {
      this.error = null;
      this.result = await this.$axios.$post('http://localhost:3001/', {
        matrix: this.matrix
      });
      if (typeof this.result !== "object") {
        this.error = this.result;
        this.isMatrix = false
        return;
      }
      console.log(this.result);
      this.isMatrix = true;
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", serif;
}

body {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(static/background.png);

}

.adjacency-incident-L_incident {
  max-width: 80vw;
  width: 1400px;
  min-width: 600px;
  max-height: 98vh;
  overflow-y: scroll;
  margin: 1vw;

  background: rgba(237, 228, 228, 0.40);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12.5px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 26px;

}

.content {
  padding: 3vw;
  max-width: 80%;
}

.matrixs {
  display: flex;
  flex-wrap: wrap;
}

.row > p {
  display: inline;
  margin-left: 1.8vw;
}

.row > p:nth-child(n+10) {
  margin-left: 1.4vw;
}

p {
  font-size: 1vw;
  color: white;
}

h3, .result, th {
  color: white;
}

td > input, td {
  width: 3vw;
  height: 3vw;
  border: none;
}


tr, input {
  text-align: center;

}

.left-incident > h3, .levels > h3 {
  margin-top: -1.5vw;
  margin-bottom: 1.5vw;
}

.levels {
  margin: 0 2vw;
}

span, .levels p {
  color: white;
}

.levels p {
  font-weight: bold;
  margin-bottom: 1vw;
}

.left-incident > ul > li {
  color: white;
  font-family: "Helvetica Neue", serif;
  list-style-type: none;
  font-weight: bold;
}

.error {
  color: red;
  font-size: 1vw;
  font-weight: bold;
}

.result {
  width: 6vw;
  height: 2vw;
  border-radius: 0.2vw;
  background-color: #00b600;
  font-weight: bold;
  border: none;
  font-size: 1vw;
}

.result:active {
  background-color: #00a000;
}

select {
  width: 6vw;
  height: 2vw;
}

.matrix {
  display: inline-block;
  max-width: 100%;
  margin-right: 3vw;
}

.matrix > .table {
  max-width: 90%;
  overflow-x: scroll;
}

.input {
  margin-right: 5vw;
  margin-bottom: 3vw;
}

.matrix > h3 {
  margin-top: -1.5vw;
}

.sizeMatrix {
  display: flex;
  margin-bottom: 2vw;
  align-items: flex-end;
}
</style>
