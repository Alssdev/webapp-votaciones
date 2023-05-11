<template>
  <div>
    <h2 class="title is-4">Alcaldes</h2>

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
      <b-button type="is-info" @click="addToTable">Agregar</b-button>
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
          @click="deleteAlcalde(props.row.idemp)"
        />
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    alcaldes: [],

    // control data
    iddep: null,
    municipio: { idmunicipio: null },
    ciudadano: { idemp: null }
  }),

  methods: {
    addToTable () {
      if (this.validActualRow()) {
        if (!this.isInTable(this.ciudadano.idemp)) {
          this.ciudadano.nombrecompleto = `${this.ciudadano.nombres}${this.ciudadano.apellidos}`;
          this.alcaldes.push({
            idemp: this.ciudadano.idemp,
            ciudadano: this.ciudadano,
            municipio: this.municipio
          });
        } else {
          this.$buefy.notification.open({
            type: 'is-warning',
            message: 'Este ciudadano ya está en la lista',
            duration: 10000
          });
        }
      } else {
        this.$buefy.notification.open({
          type: 'is-warning',
          message: 'Los datos son incorrectos',
          duration: 10000
        });
      }
    },
    validActualRow () {
      let valid = true;

      if (this.ciudadano.idemp === null) {
        valid = false;
      };
      if (this.municipio.idmunicipio === null) {
        valid = false;
      };

      return valid;
    },
    deleteAlcalde (idemp) {
      for (let i = 0; i < this.alcaldes.length; i++) {
        const alcalde = this.alcaldes[i];

        if (alcalde.idemp === idemp) {
          this.alcaldes.splice(i, 1);
          return;
        }
      }
    },
    isInTable (idemp) {
      for (let i = 0; i < this.alcaldes.length; i++) {
        const alcalde = this.alcaldes[i];

        if (alcalde.idemp === idemp) {
          return true;
        }
      }
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