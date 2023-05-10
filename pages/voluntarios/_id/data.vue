<template>
  <div>
    <h1 class="title">Datos del voluntario de mesa
      <span class="has-text-primary">ID EMP {{ idemp }}</span>
    </h1>

    <b-field label="Ciudadano">
      <b-input :value="voluntario.dpinombre" readonly />
    </b-field>
    <b-field label="Tipo de voluntario">
      <b-input :value="voluntario.nombretipo" readonly />
    </b-field>

    <hr />
    <b-field label="Departamento">
      <b-input :value="voluntario.mesa.est.municipio.depto.nombre" readonly />
    </b-field>
    <b-field label="Municipio">
      <b-input :value="voluntario.mesa.est.municipio.nombre" readonly />
    </b-field>
    <b-field label="Establecimiento">
      <b-input :value="voluntario.mesa.est.nombre" readonly />
    </b-field>
    <b-field label="No. mesa">
      <b-input :value="voluntario.mesa.nmesa" readonly />
    </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        icon-left="pencil"
        type="is-warning"
        @click="$menu(`/voluntarios/${idemp}/edit`)"
      >
        Editar
      </b-button>
      <b-button
        icon-left="delete"
        type="is-danger"
        @click="confirmDelete"
      >
        Eliminar
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    idemp: null,
    // voluntario data
    voluntario: {
      idemp: null,
      idmesa: null,
      tipo: null,
      ciudadano: {},
      mesa: { est: { municipio: { depto: { } } } }
    },

    // control data
    iddep: null,
    idmunicipio: null,
    idest: null,
    idmesa: null,
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idemp = this.$route.params.id;
      this.fetchData();
    } 
  },

  computed: {
    getTipos () {
      return [
        { tipo: 'P', nombre: 'Presidente' },
        { tipo: 'S', nombre: 'Secretario' },
        { tipo: 'V', nombre: 'Vocal' },
        { tipo: 'A', nombre: 'Alguacil' },
      ];
    }
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/voluntarios/${this.idemp}`);
        const voluntario = response.list[0];

        const ciudadano = voluntario.ciudadano;
        voluntario.dpinombre = `${ciudadano.dpi} | ${ciudadano.nombres}${ciudadano.apellidos}`;
        voluntario.nombretipo = this.getNombreTipo(voluntario.tipo);

        this.voluntario = voluntario;

        this.iddep = voluntario.mesa.est.municipio.iddep;
        this.idmunicipio = voluntario.mesa.est.idmunicipio;
        this.idest = voluntario.mesa.idest;
        this.idmesa = voluntario.idmesa;
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    getNombreTipo (tipo) {
      for (let el of this.getTipos) {
        if (el.tipo === tipo) {
          return el.nombre;
        }
      }
      return '';
    },

    async delete () {
      try {
        await this.$axios.delete(`/voluntarios/${this.idemp}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El voluntario ha sido borrado con éxito.',
          duration: 5000
        });
        this.$goBack();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete () {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete() },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>