const apiKey = "your_api_key"; 
let page = 1;
function searchImages() {
	const imgName =
		document.getElementById("searchInput").value.trim();
	if (!imgName) {
		alert("Please enter a search query.");
		return;
	}
	const url = `https://api.unsplash.com/search/photos?query=${imgName}&client_id=${apiKey}&page=${page}`; 
	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.results.length === 0) {
				alert("No images found for the given search query.");
			} else {
				showImgFn(data.results);
			}
		})
		.catch(error => console.error('Error fetching images:', error));
}
function showImgFn(images) {
	const imageContainer =
		document.getElementById("imageContainer");
	imageContainer.innerHTML = "";
	images.forEach(image => {
		const card =
			document.createElement("div");
		card.classList.add("card");
		const img =
			document.createElement("img");
		img.src = image.urls.regular;
		img.alt = "Image";
		img.onclick = function () {
			preImgFn(image.urls.full);
		};

		card.appendChild(img);
		imageContainer.appendChild(card);
	});
}
function moreImgFn() {
	page++;
	searchImages();
}
function preImgFn(imageUrl) {
	const m =
		document.getElementById("imageModal");
	const mImg =
		document.getElementById("modalImage");
	m.style.display = "block";
	mImg.src = "";
	mImg.src = imageUrl;
	mImg.onload = function () {
		mImg.onload = null;
	};
}
function closePreFn() {
	const modal =
		document.getElementById("imageModal");
	modal.style.display = "none";
}
document.getElementById("searchInput").value = "Computer";
searchImages();