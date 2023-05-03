<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar municipios..."
  >
  </b-autocomplete>
</template>

<script>
export default {
  data: () => ({
    municipios: [],
    selected: null,
    name: ''
  }),

  computed: {
    filteredData() {
      return this.municipios.filter(option => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        )
      })
    }
  },

  created () {
    this.fetchMunicipios();
  },
  
  methods: {
    async fetchMunicipios () {
      try {
        const response = await this.$axios.$get('/municipios');
        this.municipios = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.$emit('select', option);
      } else {
        this.$emit('select', { idmunicipio: null });
      }
    }
  }
}
</script>

