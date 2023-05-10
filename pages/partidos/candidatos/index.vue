<template>
  <div>
    <h1 class="title">Registro de candidatos</h1>

    <b-field label="Partido">
      <input-partido @select="" />
    </b-field>

    <div class="mt-6">
      <b-tabs v-model="activeTab" type="is-boxed" position="is-centered">
        <b-tab-item label="Presidencia">
          <registro-presidente :idpartido="idpartido" />
        </b-tab-item>
  
        <b-tab-item label="Alcaldía">
          <registro-alcalde :idpartido="idpartido" />
        </b-tab-item>
  
        <b-tab-item label="Diputados de distrito">
          <registro-d-d :idpartido="idpartido" />
        </b-tab-item>
  
        <b-tab-item label="Dibutados de listado nacional">
          <registro-d-n :idpartido="idpartido" />
        </b-tab-item>
      </b-tabs>
    </div>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    idpartido: null,

    // control data
    activeTab: 0,

  }),

  methods: {
    selectPartido (option) {
      this.idpartido = option.idpartido;
    }
  }
}
</script>