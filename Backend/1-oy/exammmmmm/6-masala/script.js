fetch("http://api.alquran.cloud/v1/surah/114/uz.sodik")
  .then((natija) => natija.json())
  .then((natijaJson) => {
    const sozlarToplami = new Map();
    natijaJson.data.ayahs.forEach((ayah) => {
      const ayahTextArray = ayah.text.split(" ");
      ayahTextArray.forEach((soz) => {
        if (!sozlarToplami.has(soz.toLowerCase())) {
          sozlarToplami.set(soz.toLowerCase(), 1);
        } else {
          sozlarToplami.set(
            soz.toLowerCase(),
            sozlarToplami.get(soz.toLowerCase()) + 1
          );
        }
      });
    });
    console.log(sozlarToplami);
  })
  .catch((error) => {
    console.log("Sura olishda hatolik boldi", error.message);
  });
