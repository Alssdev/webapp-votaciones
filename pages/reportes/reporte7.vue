<template>
  <div>
    <h1 class="title">Resultados de representates de diputados de distrito</h1>

    <b-steps animated>
      <b-step-item :step="1" label="Departamento">
        <h2 class="title has-text-centered">Escoge un departamento</h2>

        <div class="mt-6 mb-6">
          <b-field label="Departamento">
            <input-departamento @select="selectDeparamento" />
          </b-field>
        </div>
      </b-step-item>
      <b-step-item :step="2" label="Resultados">
        <div class="mt-6 mb-6">
          <h2 class="title has-text-centered">Resultados</h2>
          <table class="table is-fullwidth is-hoverable is-bordered is-striped">
            <thead>
              <tr>
                <th class="has-text-centered">Logo</th>
                <th class="has-text-centered">Partido</th>
                <th class="has-text-centered">Acrónimo</th>
                <th class="has-text-centered" width="210">Nombre completo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detail, index) in details" :key="index">
                <td>
                  <b-image :src="`http://localhost:4000/logos/${detail.logo}`" ratio="1by1" />
                </td>
                <td class="has-text-centered is-vcentered">
                  <nuxt-link :to="{ path: `/partidos/${detail.idpartido}/data` }">
                    {{ detail.nombre }}
                  </nuxt-link>
                </td>
                <td class="has-text-centered is-vcentered">
                  <nuxt-link :to="{ path: `/partidos/${detail.idpartido}/data` }">
                    {{ detail.acronimo }}
                  </nuxt-link>
                </td>
                <td class="has-text-centered is-vcentered">
                  <nuxt-link :to="{ path: `/ciudadanos/${detail.idemp}/data` }">
                    {{ `${detail.nombres}${detail.apellidos}` }}
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-step-item>

      <template
        #navigation="{previous, next}">
        <b-button
          icon-left="arrow-left"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
          >
            Regresar
        </b-button>
        <b-button
          type="is-success"
          icon-right="arrow-right"
          :disabled="next.disabled"
          @click.prevent="next.action"
          >
            Continuar
        </b-button>
      </template>
    </b-steps>
  </div>
</template>

<script>
export default {
  data: () => ({
    details: [],
    blancos: 0,
    nulos: 0,
    iddep: null
  }),

  watch: {
    iddep (idmesa) {
      if (typeof idmesa === 'number') {
        this.fetchData();
      } else {
        this.details = [];
      }
    }
  },

  methods: {
    async fetchData () {
      try {
        const api = `/reportes/${this.iddep}/minorias_diputado_distrito`;
        const response = await this.$axios.$get(api);
        this.details = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectDeparamento (option) {
      this.iddep = option.iddep;
    }
  }
}
</script>