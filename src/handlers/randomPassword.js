const generateRandomPassword = () => {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const numbers = '0123456789';
  
    // Generar una letra mayúscula aleatoria
    const randomUppercase = uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
  
    // Generar una secuencia aleatoria de 5 caracteres que pueden ser letras minúsculas o números
    let randomChars = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * (lowercaseLetters.length + numbers.length));
      const randomChar = randomIndex < lowercaseLetters.length ?
        lowercaseLetters.charAt(randomIndex) :
        numbers.charAt(randomIndex - lowercaseLetters.length);
      randomChars += randomChar;
    }
  
    // Combinar la letra mayúscula y los caracteres aleatorios y mezclarlos
    const randomPassword = randomUppercase + randomChars;
    const shuffledPassword = randomPassword.split('').sort(() => Math.random() - 0.5).join('');
  
    return shuffledPassword;
  };
module.exports = generateRandomPassword;  