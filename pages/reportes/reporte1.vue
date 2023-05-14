<template>
  <div>
    <h1 class="title">Padrón por mesa</h1>

    <b-field label="Departamento">
      <input-departamento @select="selectDeparamento" />
    </b-field>
    <b-field label="Municipio">
      <input-municipio :iddep="iddep" requireDepto @select="selectMunicipio" />
    </b-field>
    <b-field label="Establecimiento">
      <input-establecimiento :idmunicipio="idmunicipio" requireMuni @select="selectEst" />
    </b-field>
    <b-field label="Mesa">
      <input-mesa :idest="idest" @select="selectMesa" requireEst />
    </b-field>

    <div class="buttons mt-6 is-centered">
      <b-button
        icon-left="magnify"
        type="is-primary"
        :disabled="(typeof idmesa !== 'number')"
        @click="fetchData"
      >
        Consultar
      </b-button>
    </div>

    <hr />

    <div v-show="(typeof idmesa === 'number')">
      <b-table :data="ciudadanos" hoverable striped>
        <b-table-column field="idemp" label="No. Emp" v-slot="props" sortable>
          <nuxt-link :to="{ path: `/ciudadanos/${props.row.idemp}/data` }">
            {{ props.row.idemp }}
          </nuxt-link>
        </b-table-column>
        <b-table-column field="dpi" label="DPI" v-slot="props" searchable>
          <nuxt-link :to="{ path: `/ciudadanos/${props.row.idemp}/data` }">
            {{ props.row.dpi }}
          </nuxt-link>
        </b-table-column>
        <b-table-column field="nombrecompleto" label="Nombre completo" v-slot="props" searchable>
          <nuxt-link :to="{ path: `/ciudadanos/${props.row.idemp}/data` }">
            {{ props.row.nombrecompleto }}
          </nuxt-link>
        </b-table-column>
      </b-table>
  
      <nav class="level mt-6">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total</p>
            <p class="title">{{ ciudadanos.length }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Cota inferior</p>
            <p class="title">{{ mesa.cotainferior }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Cota superior</p>
            <p class="title">{{ mesa.cotasuperior}}</p>
          </div>
        </div>
      </nav>
    </div>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    idmesa: null,
    ciudadanos: [],
    
    // control data
    iddep: null,
    idmunicipio: null,
    idest: null,
    mesa: { idmesa: null }
  }),

  methods: {
    async fetchData () {
      try {
        const api = `/reportes/${this.idmesa}/padron_mesa`;
        const response = await this.$axios.$get(api);
        const ciudadanos = response.ciudadanos;

        this.ciudadanos = ciudadanos.map ((c) => {
          c.nombrecompleto = `${c.nombres}${c.apellidos}`;
          return c;
        });

      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectDeparamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.idmunicipio = option.idmunicipio;
    },
    selectEst (option) {
      this.idest = option.idest;
    },
    selectMesa (option) {
      this.idmesa = option.idmesa;
      this.mesa = option;
    },
  }
}
</script>