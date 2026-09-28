export default function ImageUploader({
    formData,
    setFormData
}) {

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            postimage: file,
            postimagePreview: URL.createObjectURL(file)
        }));

    };

    return (

        <section className="bg-[#111827] rounded-2xl p-6 border border-slate-700 mb-6">

            <label className="text-white font-semibold">

                Upload Image

            </label>

            <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-5"
            />

            {
                formData.postimagePreview && (

                    <img
                        src={formData.postimagePreview}
                        className="mt-5 rounded-xl h-80 object-cover"
                    />

                )
            }

        </section>

    );

}