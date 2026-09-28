export default function PublishButton({
    handleSubmit,
    text = "Publish Post"
}) {

    return (

        <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 py-4 rounded-xl font-semibold text-lg"
        >
            {text}

        </button>

    );

}