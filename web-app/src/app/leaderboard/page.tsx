import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <section>
      <h1 className="mx-auto text-3xl md:text-6xl font-light subpixel-antialiased">
        Leaderboard
      </h1>
      <Table className="my-3 md:my-9 mx-auto text-xl font-light subpixel-antialiased">
        <TableCaption>A list of recent scorecards.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Holes</TableHead>
            <TableHead>Course</TableHead>
            <TableHead className="text-right">Standings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">@HoleInOne</TableCell>
            <TableCell>18</TableCell>
            <TableCell>Country Club of Internet</TableCell>
            <TableCell className="text-right">1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
