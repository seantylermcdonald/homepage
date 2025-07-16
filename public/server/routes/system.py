# server/routes/system.py (example path)

import shutil
from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/api/disks")
def get_disks():
    # Add or adjust your own mount points if needed
    mount_points = ["/", "/mnt", "/mnt/media"]
    disks = []

    for mount in mount_points:
        try:
            total, used, free = shutil.disk_usage(mount)
            disks.append({
                "mount": mount,
                "total": round(total / (1024**3), 2),  # in GB
                "used": round(used / (1024**3), 2),
                "free": round(free / (1024**3), 2),
                "percent": round(used / total * 100, 1)
            })
        except FileNotFoundError:
            continue

    return {"disks": disks}
