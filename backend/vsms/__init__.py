# Global PyMySQL Monkey-Patch
# Must be at the very top before any Django imports
try:
    import pymysql
    pymysql.version_info = (1, 4, 6, "final", 0)  # Overrides internal driver version check
    pymysql.install_as_MySQLdb()  # Register pymysql as the MySQLdb implementation
except ImportError:
    pass  # pymysql not available, will fall back to default MySQL driver
