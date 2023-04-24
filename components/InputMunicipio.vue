<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar municipio..."
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
    fetchMunicipios () {
      this.municipios = [
        { nombre: 'Guatemala' },
        { nombre: 'Peten' },
        { nombre: 'Huehuetenango' }
      ]
    },

    select (option) {
      if (option) {
        this.$emit('select', option);
      } else {
        this.$emit('select', { id: null });
      }
    }
  }
}
</script>

