<template>
  <div>
    <h1 class="title">Lista de voluntario de mesa</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >
    <b-table-column field="ciudadano.dpi" label="DPI" searchable v-slot="props" >
      {{ props.row.ciudadano.dpi }}
    </b-table-column>
    <b-table-column field="ciudadano.nombres" label="Nombres" searchable v-slot="props" >
      {{ props.row.ciudadano.nombres.toUpperCase() }}
    </b-table-column>
    <b-table-column field="ciudadano.apellidos" label="Apellidos" searchable v-slot="props" >
      {{ props.row.ciudadano.apellidos.toUpperCase() }}
    </b-table-column>
    <b-table-column field="tipo" label="Tipo" searchable v-slot="props" >
      {{ props.row.tipo }}
    </b-table-column>
    <b-table-column label="Datos" v-slot="props" width="80">
      <b-button
        type="is-info"
        icon-left="information"
        @click="$menu(`/voluntarios/${props.row.idemp}/data`)"
      />
    </b-table-column>
    <b-table-column label="Editar" v-slot="props" width="80">
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/voluntarios/${props.row.idemp}/edit`)"
      />
    </b-table-column>
    <b-table-column label="Eliminar" v-slot="props" width="80">
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete(props.row.idemp)"
      />
    </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [],
    selected: null,
  }),

  created () {
    this.fetchData();
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get('/voluntarios');
        this.list = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete (idemp) {
      try {
        await this.$axios.delete(`/voluntarios/${idemp}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El voluntario ha sido borrado con éxito.',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (idemp) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(idemp) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>