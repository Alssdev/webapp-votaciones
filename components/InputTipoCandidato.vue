<template>
  <b-autocomplete
    v-model="nombre"
    :data="filteredData"
    field="nombre"
    @select="select"
    :clearable="!readonly"
    open-on-focus
    placeholder="Buscar tipos de candidatos..."
    :readonly="readonly"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    tipos: [
      { tipo: 'P', nombre: 'Presidencia' },
      { tipo: 'A', nombre: 'Alcaldía' },
      { tipo: 'D', nombre: 'Diputados de distrito' },
      { tipo: 'N', nombre: 'Listado nacional' },
    ],
    nombre: '',
    
    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.tipos.filter(option => {
        return option.nombre
            .toLowerCase()
            .indexOf(this.nombre.toLowerCase()) >= 0;
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

