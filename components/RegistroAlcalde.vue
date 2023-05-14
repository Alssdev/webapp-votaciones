<template>
  <div class="pt-5">
    <h2 class="title is-4 has-text-info">Alcaldes</h2>

    <b-field label="Ciudadano">
      <input-ciudadano @select="selectCiudadano" />
    </b-field>

    <b-field grouped>
      <b-field label="Departamento" expanded>
        <input-departamento @select="selectDepartamento" />
      </b-field>
      <b-field label="Municipio" expanded>
        <input-municipio :iddep="iddep" @select="selectMunicipio" requireDepto />
      </b-field>
    </b-field>

    <div class="buttons mt-5 is-centered">
      <b-button type="is-info" @click="confirmAdd">Agregar</b-button>
    </div>

    <hr />

    <b-table :data="alcaldes" hoverable striped>
      <b-table-column label="DPI" v-slot="props">
        {{ props.row.ciudadano.dpi }}
      </b-table-column>
      <b-table-column label="Nombre" v-slot="props">
        {{ props.row.ciudadano.nombrecompleto }}
      </b-table-column>
      <b-table-column label="Departamento" v-slot="props">
        {{ props.row.municipio.depto.nombre }}
      </b-table-column>
      <b-table-column label="Municipio" v-slot="props">
        {{ props.row.municipio.nombre }}
      </b-table-column>
      <b-table-column label="Eliminar" v-slot="props">
        <b-button
          icon-left="delete"
          type="is-danger"
          @click="confirmDelete(props.row.idemp)"
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
    alcaldes: [],

    // control data
    iddep: null,
    municipio: { idmunicipio: null },
    ciudadano: { idemp: null }
  }),

  watch: {
    idpartido (newValue) {
      if (typeof newValue === 'number') {
        this.fetchData();
      } else {
        this.alcaldes = [];
        this.iddep = null;
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
          message: 'El alcalde ha sido registrado con éxito.',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
      
    },
    validActualRow () {
      return true;
    },
    prepareBodyRequest () {
      return {
        idemp: this.ciudadano.idemp,
        idpartido: this.idpartido,
        casilla: null,
        tipo: 'A',
        idmunicipio: this.municipio.idmunicipio,
        iddep: null
      }
    },
    confirmAdd () {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: this.addToTable,
        hasIcon: true,
        type: 'is-success',
      });
    },

    async fetchData () {
      try {
        // fetch response
        const response = await this.$axios.$get(`/candidatos/${this.idpartido}/alcaldes`);

        const alcaldes = [];

        for (const alcalde of response.alcaldes) {
          alcalde.ciudadano.nombrecompleto = `${alcalde.ciudadano.nombres}${alcalde.ciudadano.apellidos}`;
          alcaldes.push({
            idemp: alcalde.ciudadano.idemp,
            ciudadano: alcalde.ciudadano,
            municipio: alcalde.municipio
          });
        }

        this.alcaldes = alcaldes;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async deleteAlcalde (idemp) {
      try {
        await this.$axios.delete(`/candidatos/${idemp}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El alcalde ha sido borrado con éxito.',
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

    selectDepartamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.municipio = option;
    },
    selectCiudadano (option) {
      this.ciudadano = option;
    },
  }

}
</script>