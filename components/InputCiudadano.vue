<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar un ciudadano..."
  >
  </b-autocomplete>
</template>

<script>
export default {
  data: () => ({
    ciudadanos: [],
    selected: null,
    name: ''
  }),

  computed: {
    filteredData() {
      return this.ciudadanos.filter(option => {
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
    this.fetchCiudadanos();
  },
  

  methods: {
    fetchCiudadanos () {
      this.ciudadanos = [
        { nombre: 'Nova' },
        { nombre: 'Ruby' },
        { nombre: 'Oscar' },
        { nombre: 'Adrian' }
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

