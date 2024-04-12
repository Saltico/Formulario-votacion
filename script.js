document.addEventListener('DOMContentLoaded', function() {
  //LLENAR SELECTS CON REGIONES Y COMUNAS
  fetch('region.json')
    .then(response => response.json())
    .then(data => {
      var regionSelect = document.getElementById('region');
      data.regiones.forEach(function(region) {
        var option = document.createElement('option');
        option.text = region.region;
        option.value = region.region;
        regionSelect.add(option);
      });

      var comunaSelect = document.getElementById('comuna');
      function fillComunas() {
        var selectedRegion = regionSelect.value;
        var comunas = data.regiones.find(function(region) {
          return region.region === selectedRegion;
        }).comunas;

        comunaSelect.innerHTML = '';
        comunas.forEach(function(comuna) {
          var option = document.createElement('option');
          option.text = comuna;
          option.value = comuna;
          comunaSelect.add(option);
        });
      }

      regionSelect.addEventListener('change', fillComunas);
      fillComunas();
    })
    .catch(error => console.error('Error cargando Regiones:', error));

  //FORMATEAR RUT Y VERIFICAR QUE SEA VÁLIDO
  var rutInput = document.getElementById('rut');
  var rutValid = document.getElementById('rut-validator');
  var formButton = document.querySelector('.form-button');

  rutInput.addEventListener('input', function() {
      var rut = rutInput.value.trim();
      var rutRegex = /^\d{7,8}-[\dkK]$/;

      if (rutRegex.test(rut)) {
          rutValid.textContent= '';
          formButton.disabled = false;
      } else {
          rutValid.textContent = 'RUT no válido';
          rutValid.style.color = 'red';
          formButton.disabled = true;
      }
  });

  //AJAX PARA PHP
  $('#form').submit(function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: 'vote.php',
      data: formData,
      success: function(response){
        if(response.indexOf('Duplicate entry') !== -1){
          $('#resultado').html('Credenciales duplicadas, ya votaste.');
        }else{
          $('#resultado').html(response);
        }
      }
    });
  });
});