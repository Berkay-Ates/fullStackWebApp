dto: Data Transfer Objects 
    Veri transferi sirasinda kullanilan sade objelerdir, genellikle entity yerine dis dunyayla veri alisverisinde kullanilir. 


@NotNull → Değişkenin değeri null olamaz, ama boş olabilir (örneğin "" veya 0 kabul edilir).

@NotBlank → Sadece String alanlarda kullanılır; değer null, boş ("") veya sadece boşluklardan oluşamaz.

@NotEmpty → Koleksiyon, dizi veya String için kullanılır; değer null olamaz ve en az bir eleman veya karakter içermelidir.