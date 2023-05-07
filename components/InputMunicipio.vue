<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar municipios..."
    :disabled="disabled"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    iddep: {
      type: Number,
      default: null
    },
    idmunicipio: {
      type: Number,
      default: null
    },
    requireDepto: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    municipios: [],
    selected: null,
    name: '',
    
    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.municipios.filter(option => {
        const nameFilter = option.nombre
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0;
        const iddepFilter = typeof this.iddep === 'number' ? option.iddep === this.iddep : true;

        return iddepFilter && nameFilter;
      });
    },

    disabled () {
      return (this.requireDepto ? typeof this.iddep !== 'number' : false);
    }
  },

  created () {
    this.fetchMunicipios();
  },

  watch: {
    iddep () {
      this.clearAllData();
    },
    idmunicipio (idmunicipio) {
      if (typeof idmunicipio === 'number') {
        if (this.municipios.length !== 0) {
          // only if fetch has finished
          this.selectByIdmunicipio(idmunicipio);
        }
      } else {
        this.clearAllData();
      }
    }
  },
  
  methods: {
    async fetchMunicipios () {
      try {
        // fetch Data
        const response = await this.$axios.$get('/municipios');
        this.municipios = response.list;

        // autoselect
        if (typeof this.idmunicipio === 'number') {
          this.selectByIdmunicipio(this.idmunicipio);
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.name = option.nombre;
        this.$emit('select', option);
      }
    },
    unset () {
      this.$emit('select', { idmunicipio: null });
    },
    selectByIdmunicipio (idmunicipio) {
      const selected = (this.municipios.filter(option => (option.idmunicipio === idmunicipio)))[0];
      this.select(selected);
    },
    clearAllData () {
      this.name = '';
      this.unset();
    }
  }
}
</script>

