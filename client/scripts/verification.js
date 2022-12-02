const validate = () => {
    const codePostalInput = document.querySelector( '#codePostal' );
    const telephoneInput = document.querySelector( '#telephone' );

    const codePostalErrorMsg   = document.querySelector( '#codePostalErrorMsg' );
    const telephoneErrorMsg   = document.querySelector( '#telephoneErrorMsg' );

    const CPregex = new RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i)
    const phoneRegex = new RegExp(/^\d{10}$/)

    console.log(CPregex.test( codePostalInput ))
    const cp = CPregex.test( codePostalInput ) ? '' : 'Code postal invalide, votre entrée doit être sous la forme A1A1A1';
    codePostalErrorMsg.textContent = cp;
    codePostalInput.addEventListener( 'keyup', function ( e ) {
        const cp = CPregex.test( this.value ) ? '' : 'Code postal invalide, votre entrée doit être sous la forme A1A1A1';
        codePostalErrorMsg.textContent = cp;
    } );

    const phone = phoneRegex.test( telephoneInput ) ? '' : 'Numéro de téléphone invalide, votre entrée doit être sous la forme 123456789';
    telephoneErrorMsg.textContent = phone;
    telephoneInput.addEventListener( 'keyup', function ( e ) {
        const phone = phoneRegex.test( this.value ) ? '' : 'Numéro de téléphone invalide, votre entrée doit être sous la forme 123456789';
        telephoneErrorMsg.textContent = phone;
    } );
}
