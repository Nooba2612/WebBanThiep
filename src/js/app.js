/* Variables */
const $ = document.querySelector.bind(document);

const seacrhBoxInput = $(".navbar--item__search-box input");

/* Functions */
const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(seacrhBoxInput.value);
    seacrhBoxInput.value = "";
};

const handleEnterPressForm = (e) => {
    if (e.keyCode === 13) {
        console.log(seacrhBoxInput.value);
        seacrhBoxInput.value = "";
    }
};

const handleNullFeature = () => {
    alert("Chức năng đang được chúng tôi phát triển");
};
