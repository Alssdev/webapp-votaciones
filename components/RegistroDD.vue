<template>
  <div class="pt-5">
    <h2 class="title is-4 has-text-info">Diputados de distrito</h2>

    <b-field label="Departamento" expanded>
      <input-departamento @select="selectDepartamento" />
    </b-field>

    <hr />
    <b-field grouped>
      <b-field label="Ciudadano" expanded>
        <input-ciudadano @select="selectCiudadano" />
      </b-field>
      <b-field label="Casilla">
        <b-input v-model.number="casilla" type="number" min="0" />
      </b-field>
    </b-field>

    <div class="buttons mt-5 is-centered">
      <b-button type="is-info" @click="confirmAdd">Agregar</b-button>
    </div>

    <hr />

    <b-table :data="diputados" hoverable striped>
      <b-table-column field="casilla" label="Casilla" sortable v-slot="props">
        {{ props.row.casilla }}
      </b-table-column>
      <b-table-column label="DPI" v-slot="props">
        {{ props.row.ciudadano.dpi }}
      </b-table-column>
      <b-table-column field="ciudadano.nombrecompleto" label="Nombre" searchable v-slot="props">
        {{ props.row.ciudadano.nombrecompleto }}
      </b-table-column>
      <b-table-column label="Departamento" sortable searchable v-slot="props">
        {{ props.row.ciudadano.municipio.depto.nombre }}
      </b-table-column>
      <b-table-column label="Eliminar" v-slot="props">
        <b-button
          icon-left="delete"
          type="is-danger"
          @click="confirmDelete(props.row.ciudadano.idemp)"
        />
      </b-table-column>
    </b-table>
    
  </div>
</template>

<script>
export default {
  props: {
    idpartido: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    diputados: [],

    // selected
    ciudadano: { idemp: null },
    departamento: { iddep: null },
    iddep: null,
    casilla: null,

    // control data
  }),

  watch: {
    idpartido (newValue) {
      if (typeof newValue === 'number' && typeof this.iddep === 'number') {
        this.fetchData();
      } else {
        this.diputados = [];
      }
    },
    iddep (newValue) {
      if (typeof newValue === 'number' && typeof this.idpartido === 'number') {
        this.fetchData();
      } else {
        this.diputados = [];
      }
    }
  },

  methods: {
    async addToTable () {
      try {
        // create an alcalde
        await this.$axios.post('/candidatos', this.prepareBodyRequest());
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El diputado ha sido registrado con éxito.',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
      
    },
    prepareBodyRequest () {
      return {
        idemp: this.ciudadano.idemp,
        idpartido: this.idpartido,
        casilla: this.casilla,
        tipo: 'D',
        idmunicipio: null,
        iddep: this.departamento.iddep
      }
    },
    confirmAdd () {
      if (this.validActualRow()) {
          this.$buefy.dialog.confirm({
            title: 'Confirmación',
            message: `Antes de completar el proceso debe 
            confirmar que está seguro ¿Desea continuar?`,
            onConfirm: this.addToTable,
            hasIcon: true,
            type: 'is-success',
          });
        } else {
          this.$buefy.notification.open({
            type: 'is-warning',
            message: 'Los datos son incorrectos.',
            duration: 10000
          });
        }
    },
    validActualRow () {
      if (this.ciudadano.idemp === null) return false;
      if (this.departamento.iddep === null) return false;
      if (typeof this.casilla !== 'number') return false;
      if (typeof this.idpartido !== 'number') return false;

      return true;
    },

    async fetchData () {
      try {
        // fetch response
        const api = `/candidatos/${this.idpartido}/${this.iddep}/diputado_distrito`;
        const response = await this.$axios.$get(api);

        for (const diputado of response.diputados) {
          diputado.ciudadano.nombrecompleto = `${diputado.ciudadano.nombres}${diputado.ciudadano.apellidos}`;
        }

        this.diputados = response.diputados;

      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async deleteAlcalde (idemp) {
      try {
        await this.$axios.delete(`/candidatos/${idemp}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El diputado ha sido borrado con éxito.',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (idemp) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.deleteAlcalde(idemp) },
        hasIcon: true,
        type: 'is-success',
      });
    },

    selectCiudadano (option) {
      this.ciudadano = option;
    },
    selectDepartamento (option) {
      this.departamento = option;
      this.iddep = option.iddep;
    }
  }
}
</script>