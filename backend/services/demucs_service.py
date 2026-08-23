import os
import subprocess

OUTPUT_FOLDER = "outputs"


def extract_vocals(
    input_path: str,
    model: str = "htdemucs",
    output_format: str = "wav",
):

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    command = [
        "python",
        "-m",
        "demucs",
        "-n",
        model,
        "--two-stems",
        "vocals",
    ]

    if output_format == "mp3":
        command.append("--mp3")

    elif output_format == "flac":
        command.append("--flac")

    command.extend([
        "-o",
        OUTPUT_FOLDER,
        input_path,
    ])

    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        raise Exception(result.stderr)

    song_name = os.path.splitext(
        os.path.basename(input_path)
    )[0]

    extension = output_format

    return {
        "success": True,
        "model": model,
        "format": output_format,
        "vocals": os.path.join(
            OUTPUT_FOLDER,
            "htdemucs",
            song_name,
            f"vocals.{extension}",
        ),
        "instrumental": os.path.join(
            OUTPUT_FOLDER,
            "htdemucs",
            song_name,
            f"no_vocals.{extension}",
        ),
    }