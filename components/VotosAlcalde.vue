<template>
  <div>
    <div class="table-container">
      <table class="table is-fullwidth is-hoverable is-bordered is-striped">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre</th>
            <th>Acrónimo</th>
            <th width="210">Votos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in details" :key="index">
            <td>
              <b-image src="https://picsum.photos/600/400" ratio="1by1" />
            </td>
            <td class="has-text-centered is-vcentered">
              {{ detail.partido.nombre }}
            </td>
            <td class="has-text-centered is-vcentered">
              {{ detail.partido.acronimo }}
            </td>
            <td class="has-text-centered is-vcentered">
              <b-input v-model.number="detail.votos" class="i-small" type="number" min="0" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr />
    <div class="columns">
      <div class="column">
        <b-field label="Votos en blanco">
          <b-input v-model.number="blancos" type="number" />
        </b-field>
        <b-field label="Votos nulos">
          <b-input v-model.number="nulos" type="number" />
        </b-field>
      </div>
      <div class="column"></div>
    </div>
    <hr />

    <div class="buttons is-centered">
      <b-button type="is-primary" icon-left="check" @click="confirm" size="is-large">Completar</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idmesa: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    details: [],

    nulos: 0,
    blancos: 0
  }),

  created () {
    this.fetchPartidos();
  },

  methods: {
    async fetchPartidos () {
      try {
        const response = await this.$axios.$get('/partidos');

        const partidos = response.list;
        this.details = partidos.map((p) => {
          return {
            partido: p,
            votos: 0
          }
        });
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async pushData () {
      try {
        const body = await this.prepareBodyRequest();
        console.log(body);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      const detalles = this.details.map((d) => ({
        idpartido: d.partido.idpartido,
        cantidad: d.votos
      }));

      return {
        idmesa: this.idmesa,
        tipo: 'A',
        detalles,
        votosBlancos: this.blancos,
        votosNulos: this.nulos
      }
    },
    validateData () {
      return true;
    },
    confirm () {
      if (this.validateData()) {
        this.$buefy.dialog.confirm({
          title: 'Confirmación',
          message: `Antes de completar el proceso debe 
          confirmar que está seguro ¿Desea continuar?`,
          onConfirm: this.pushData,
          hasIcon: true,
          type: 'is-success',
        });
      }
    }
  }
}
</script>

<style scoped>
.i-small {
  max-width: 200px;
  margin: 0;
  padding: 0;
}
</style>