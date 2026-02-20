#!/usr/bin/env python3
"""
Verification script to check if the my-app backend and frontend are properly configured.
Run this script before starting the application to ensure everything is set up correctly.
"""

import os
import sys
import json
from pathlib import Path

def check_file(path, description):
    """Check if a file exists."""
    exists = os.path.exists(path)
    status = "✓" if exists else "✗"
    print(f"{status} {description}: {path}")
    return exists

def check_directory(path, description):
    """Check if a directory exists."""
    exists = os.path.isdir(path)
    status = "✓" if exists else "✗"
    print(f"{status} {description}: {path}")
    return exists

def check_env_variable(filename, var_name):
    """Check if an environment variable is set in a file."""
    if not os.path.exists(filename):
        print(f"✗ Cannot check {var_name} - file not found: {filename}")
        return False
    
    with open(filename, 'r') as f:
        content = f.read()
        exists = var_name in content
        status = "✓" if exists else "✗"
        print(f"  {status} {var_name}")
        return exists

def check_json_field(filename, *path):
    """Check if a field exists in a JSON file."""
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            
        current = data
        for key in path[:-1]:
            if key in current:
                current = current[key]
            else:
                return False
        
        return path[-1] in current
    except Exception:
        return False

def main():
    print("=" * 60)
    print("Logup Application - Configuration Verification")
    print("=" * 60)
    print()
    
    all_good = True
    
    # Check frontend files
    print("📦 Frontend (Next.js) Configuration:")
    all_good &= check_file("package.json", "package.json present")
    all_good &= check_file(".env.local", ".env.local present")
    all_good &= check_file("app/lib/api.js", "API client present")
    all_good &= check_file("app/logIn/page.js", "Login page present")
    all_good &= check_file("app/signUp/page.js", "Signup page present")
    print()
    
    # Check npm scripts
    print("📝 NPM Scripts:")
    if check_json_field("package.json", "scripts", "dev"):
        print("  ✓ dev script configured")
    if check_json_field("package.json", "scripts", "dev:backend"):
        print("  ✓ dev:backend script configured")
    if check_json_field("package.json", "scripts", "dev:all"):
        print("  ✓ dev:all script configured")
    if check_json_field("package.json", "devDependencies", "concurrently"):
        print("  ✓ concurrently dependency installed")
    print()
    
    # Check frontend environment variables
    print("🔐 Frontend Environment Variables (.env.local):")
    check_env_variable(".env.local", "NEXT_PUBLIC_API_URL")
    print()
    
    # Check backend files
    print("🐍 Backend (FastAPI) Configuration:")
    all_good &= check_directory("backend", "backend directory present")
    all_good &= check_directory("backend/app", "backend/app directory present")
    all_good &= check_file("backend/app/main.py", "FastAPI main app present")
    all_good &= check_file("backend/app/routes/auth.py", "Auth routes present")
    all_good &= check_file("backend/requirements.txt", "requirements.txt present")
    all_good &= check_file("backend/.env", "backend/.env present")
    print()
    
    # Check backend environment variables
    print("🔐 Backend Environment Variables (.env):")
    check_env_variable("backend/.env", "SECRET_KEY")
    check_env_variable("backend/.env", "ALGORITHM")
    check_env_variable("backend/.env", "ACCESS_TOKEN_EXPIRE_MINUTES")
    check_env_variable("backend/.env", "DATABASE_URL")
    print()
    
    # Check backend requirements
    print("📚 Backend Dependencies (requirements.txt):")
    required_packages = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "pydantic",
        "pydantic-settings",
        "python-jose",
        "passlib",
        "python-multipart",
        "email-validator"
    ]
    
    if os.path.exists("backend/requirements.txt"):
        with open("backend/requirements.txt", 'r') as f:
            content = f.read().lower()
            for package in required_packages:
                exists = package in content
                status = "✓" if exists else "✗"
                print(f"  {status} {package}")
    print()
    
    # Check startup scripts
    print("🚀 Startup Scripts:")
    all_good &= check_file("start.bat", "Windows startup script (start.bat)")
    all_good &= check_file("start.ps1", "PowerShell startup script (start.ps1)")
    all_good &= check_file("start.sh", "Unix startup script (start.sh)")
    print()
    
    # Check documentation
    print("📖 Documentation:")
    all_good &= check_file("SETUP_GUIDE.md", "Setup guide present")
    print()
    
    # Summary
    print("=" * 60)
    if all_good:
        print("✓ All critical files are in place!")
        print()
        print("Next steps:")
        print("1. cd my-app")
        print("2. npm install")
        print("3. cd backend && pip install -r requirements.txt && cd ..")
        print("4. npm run dev:all")
        print()
        print("Or run one of the startup scripts:")
        print("  Windows: start.bat")
        print("  PowerShell: start.ps1")
        print("  Unix/Linux/macOS: bash start.sh")
        return 0
    else:
        print("✗ Some critical files are missing!")
        print("Please ensure all files are properly set up before running.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
