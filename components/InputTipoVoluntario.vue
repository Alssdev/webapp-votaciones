<template>
  <b-autocomplete
    v-model="nombre"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar tipos de voluntarios..."
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    idmesa: {
      type: Number,
      default: null
    },
  },

  data: () => ({
    tipos: [
      { tipo: 'P', nombre: 'Presidente' },
      { tipo: 'S', nombre: 'Secretario' },
      { tipo: 'V', nombre: 'Vocal' },
      { tipo: 'A', nombre: 'Alguacil' },
    ],
    nombre: '',
    
    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.tipos.filter(option => {
        const nFilter = option.nombre
            .toLowerCase()
            .indexOf(this.nombre.toLowerCase()) >= 0;

        return nFilter;
      });
    }
  },

  watch: {
    tipo (tipo) {
      if (typeof tipo === 'string') {
        this.selectByTipo(tipo);
      } else {
        this.clearAllData();
      }
    }
  },
  
  methods: {
    select (option) {
      if (option) {
        this.nombre = option.nombre;
        this.$emit('select', option);
      } else {
        this.unset();
      }
    },
    unset () {
      this.$emit('select', { tipo: null });
    },
    selectByTipo (tipo) {
      const selected = (this.tipos.filter(option => (option.tipo === tipo)))[0];
      this.select(selected);
    },
    clearAllData () {
      this.nombre = '';
      this.unset();
    }
  }
}
</script>

