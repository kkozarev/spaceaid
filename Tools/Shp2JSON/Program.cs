namespace Shp2JSON
{
    using System.Diagnostics;
    using System.IO;
    using System.Linq;

    class Program
    {
        static void Main(string[] args)
        {
            var root = args.Any() ? args.Single() : @"C:\Users\Bon\Desktop\Corine Dissolve";
            var filePaths = Directory.GetFiles(root, "*.shp", SearchOption.AllDirectories);
            foreach (var path in filePaths)
            {
                var outputPath = string.Format(@"{0}\JSON\{1}.geojson", root, Path.GetFileNameWithoutExtension(path));
                Process.Start(
                    @"C:\Program Files\QGIS Brighton\bin\ogr2ogr.exe",
                    string.Format(" -f GeoJSON -t_srs crs:84 \"{0}\" \"{1}\"", outputPath, path));
            }
        }
    }
}
