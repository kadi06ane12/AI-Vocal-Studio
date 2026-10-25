import os
import subprocess
import sys

OUTPUT_FOLDER = "outputs"

def extract_vocals(
    input_path: str,
    model: str = "mdx_extra",
    output_format: str = "wav",
):
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    command = [
        sys.executable,
        "-m",
        "demucs",
            "-n",
        model,
        "--shifts",
        "0",
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
        timeout=600,
    )

    print("Demucs return code:", result.returncode, flush=True)
    print("Demucs stdout:", result.stdout, flush=True)
    print("Demucs stderr:", result.stderr, flush=True)

    if result.returncode != 0:
        raise RuntimeError(result.stderr or result.stdout)

    song_name = os.path.splitext(
        os.path.basename(input_path)
    )[0]

    return {
        "success": True,
        "model": model,
        "format": output_format,
        "vocals": os.path.join(
            OUTPUT_FOLDER,
            model,
            song_name,
            f"vocals.{output_format}",
        ),
        "instrumental": os.path.join(
            OUTPUT_FOLDER,
            model,
            song_name,
            f"no_vocals.{output_format}",
        ),
    }
