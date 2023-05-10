<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    @typing="unset"
    open-on-focus
    placeholder="Buscar partidos..."
    :clearable="!readonly"
    :readonly="readonly"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    idpartido: {
      type: Number,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    partidos: [],
    name: '',

    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.partidos.filter(option => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        )
      })
    }
  },

  watch: {
    idpartido (idpartido) {
      if (typeof idpartido === 'number') {
        if (this.partidos.length !== 0) {
          // only if fetch has finished
          this.selectByIdpartido(idpartido);
        }
      } else {
        // clear all data
        this.name = '';
        this.unset();
      }
    }
  },

  created () {
    this.fetchPartidos();
  },
  
  methods: {
    async fetchPartidos () {
      try {
        // fetch data
        const response = await this.$axios.$get('/partidos');
        this.partidos = response.list;

        // autoselect
        if (typeof this.idpartido === 'number') {
          this.selectByIddep(this.idpartido);
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.name = option.nombre;
        this.$emit('select', option);
      } else {
        this.unset();
      }
    },
    unset () {
      this.$emit('select', { idpartido: null });
    },
    selectByIdpartido (idpartido) {
      const selected = (this.partidos.filter(option => (option.idpartido === idpartido)))[0];
      this.select(selected);
    }
  }
}
</script>

