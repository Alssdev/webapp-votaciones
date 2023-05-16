<template>
  <div>
    <h1 class="title">Datos del ciudadano
      <span class="has-text-primary">ID{{ idemp }}</span>
    </h1>
  
    <b-field label="No. Emp">
      <b-input :value="ciudadano.idemp" readonly />
    </b-field>
    <b-field label="DPI">
      <b-input :value="ciudadano.dpi" readonly />
    </b-field>

    <hr />
    <b-field grouped>
      <b-field label="Primer nombre" expanded>
        <b-input :value="ciudadano.nombre1" readonly />
      </b-field>
      <b-field label="Segundo nombre" expanded>
        <b-input :value="ciudadano.nombre2" readonly />
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field label="Primer apellido" expanded>
        <b-input :value="ciudadano.apellido1" readonly />
      </b-field>
      <b-field label="Segundo apellido" expanded>
        <b-input :value="ciudadano.apellido2" readonly />
      </b-field>
    </b-field>

    <hr />
    <b-field label="Dirección">
      <b-input :value="ciudadano.direccion" type="textarea" readonly />
    </b-field>
    <b-field label="Departamento">
      <b-input :value="ciudadano.municipio.depto.nombre" readonly />
    </b-field>
    <b-field label="Municipio">
      <b-input :value="ciudadano.municipio.nombre" readonly />
    </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button
        icon-left="arrow-left"
        @click="$goBack"
      >
        Regresar
      </b-button>
      <b-button
        icon-left="pencil"
        type="is-warning"
        @click="$menu(`/ciudadanos/${idemp}/edit`)"
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
    ciudadano: {
      nombre1: '',
      nombre2: '',
      nombre3: '',
      apellido1: '',
      apellido2: '',
      dpi: '',
      idmunicipio: null,
      direccion: '',
      municipio: { depto: {} }
    }
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idemp = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/ciudadanos/${this.idemp}`);
        const ciudadano = response.list[0];
        const municipio = await this.fetchMunicipio(ciudadano.idmunicipio);

        // process nombres
        let nombres = ciudadano.nombres.split(',');
        ciudadano.nombre1 = nombres[0];
        ciudadano.nombre2 = nombres[1];
        ciudadano.nombre3 = nombres[2];

        // process apellidos
        let apellidos = ciudadano.apellidos.split(',');
        ciudadano.apellido1 = apellidos[0];
        ciudadano.apellido2 = apellidos[1];

        this.ciudadano = {
          ...ciudadano,
          municipio
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    async fetchMunicipio (idmunicipio) {
      return (await this.$axios.$get(`/municipios/${idmunicipio}`)).list[0];
    },

    async delete () {
      try {
        await this.$axios.delete(`/ciudadanos/${this.idemp}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El ciudadano ha sido borrado con éxito',
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