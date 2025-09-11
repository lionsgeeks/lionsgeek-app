import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, XCircle, Users, Edit } from 'lucide-react';

const statusBadge = (status) => {
	if (status === 'approved') {
		return (
			<Badge className="bg-green-100 text-green-700 hover:bg-green-100">
				<CheckCircle2 className="mr-1 h-3 w-3" /> Approved
			</Badge>
		);
	}
	if (status === 'rejected') {
		return (
			<Badge className="bg-red-100 text-red-700 hover:bg-red-100">
				<XCircle className="mr-1 h-3 w-3" /> Rejected
			</Badge>
		);
	}
	return (
		<Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
			<Clock className="mr-1 h-3 w-3" /> Pending
		</Badge>
	);
};

const stepBadge = (step) => {
	if (!step) return <Badge className="bg-[#212529] text-white">Unknown</Badge>;
	const s = step.replaceAll('_', ' ');
	if (step === 'info_session') return <Badge className="bg-[#f2f2f2] text-[#212529]">{s}</Badge>;
	if (['interview', 'interview_pending', 'jungle'].includes(step))
		return <Badge className="bg-[#fee819] text-[#212529]">{s}</Badge>;
	if (step.includes('failed')) return <Badge className="bg-[#ff7376] text-white">{s}</Badge>;
	return <Badge className="bg-[#212529] text-white">{s}</Badge>;
};

export default function ParticipantsTable({ participants }) {
	return (
		<Card className="border-0 bg-white shadow-lg">
			<CardContent className="p-0">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200 bg-gray-50">
								<th className="px-6 py-4 text-left text-sm font-semibold text-[#212529]">Name</th>
								<th className="hidden px-6 py-4 text-left text-sm font-semibold text-[#212529] md:table-cell">Email</th>
								<th className="hidden px-6 py-4 text-left text-sm font-semibold text-[#212529] lg:table-cell">Phone</th>
								<th className="hidden px-6 py-4 text-left text-sm font-semibold text-[#212529] md:table-cell">City</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-[#212529]">Step</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-[#212529]">Status</th>
								<th className="hidden px-6 py-4 text-right text-sm font-semibold text-[#212529] sm:table-cell">Actions</th>
							</tr>
						</thead>
						<tbody>
							{participants.map((p) => (
								<tr
									key={p.id}
									onClick={() => (window.location.href = `/admin/participants/${p.id}`)}
									className="group cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
								>
									<td className="px-6 py-4">
										<div className="font-medium text-[#212529]">{p.full_name}</div>
										<div className="text-xs text-gray-500 md:hidden">{p.email}</div>
									</td>
									<td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">{p.email}</td>
									<td className="hidden px-6 py-4 text-sm text-gray-600 lg:table-cell">{p.phone}</td>
									<td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell capitalize">
										{p.city || 'Unknown'}{p.prefecture ? `, ${p.prefecture.replaceAll('_', ' ')}` : ''}
									</td>
									<td className="px-6 py-4">{stepBadge(p.current_step)}</td>
									<td className="px-6 py-4">{statusBadge(p.status)}</td>
									<td onClick={(e) => e.stopPropagation()} className="hidden px-6 py-4 text-right sm:table-cell">
										<Button
											variant="outline"
											size="sm"
											onClick={() => (window.location.href = `/admin/participants/${p.id}/edit`)}
											className="hover:bg-[#fee819] hover:text-[#212529]"
										>
											<Edit className="h-4 w-4" />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}
