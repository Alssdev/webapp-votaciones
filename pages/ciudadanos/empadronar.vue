<template>
  <div>
    <h1 class="title">Empadronamiento de un ciudadano</h1>
  
    <b-field label="DPI">
      <b-input type="number" placeholder="0463 90050 5110" maxlenght="15" />
    </b-field>

    <hr />
    <b-field grouped>
      <b-field label="Primer nombre" expanded>
        <b-input maxlength="33" />
      </b-field>
      <b-field label="Segundo nombre" expanded>
        <b-input maxlength="33" />
      </b-field>
      <b-field label="Tercer nombre" expanded>
        <b-input maxlength="33" />
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field label="Primer apellido" expanded>
        <b-input maxlength="50" />
      </b-field>
      <b-field label="Segundo apellido" expanded>
        <b-input maxlength="50" />
      </b-field>
    </b-field>

    <hr />
    <b-field label="Dirección">
      <b-input type="textarea" maxlength="250" />
    </b-field>
    <b-field label="Departamento">
      <input-departamento />
    </b-field>
    <b-field label="Municipio">
      <input-municipio />
    </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left">Regresar</b-button>
      <b-button icon-left="pencil" type="is-primary">Crear</b-button>
    </div>
  </div>
</template>