<template>
  <div>
    <h1 class="title">Crear un establecimiento</h1>

    <b-field label="Nombre">
      <b-input placeholder="Nombre del establecimiento" maxlength="50" />
    </b-field>

    <b-field label="Dirección">
      <b-input placeholder="Ciudad" type="textarea" maxlength="200" />
    </b-field>

    <b-field label="Municipio">
      <input-municipio />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left">Regresar</b-button>
      <b-button icon-left="check-bold" type="is-primary">Crear</b-button>
    </div>
  </div>
</template>